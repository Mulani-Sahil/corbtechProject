// ============================================================
// app/api/upload/route.js
// API Route: POST /api/upload
//
// What this does:
//   1. Receives a PDF file from the frontend (FormData)
//   2. Validates: must be .pdf, under 15MB
//   3. Extracts all text using pdf-parse
//   4. Cleans the text (removes excess whitespace, weird line breaks)
//   5. Splits text into RAG chunks using our chunker utility
//   6. Extracts metadata: title, author, page count, word count
//   7. Returns everything to the frontend as JSON
// ============================================================

import { NextResponse } from 'next/server';
import pdfParse from 'pdf-parse';
import { chunkText } from '../../lib/chunker';

// Use Node.js runtime (not Edge) because pdf-parse needs Node APIs
export const runtime = 'nodejs';
export const maxDuration = 60; // 60 second timeout for large PDFs

export async function POST(req) {
  try {
    // ── 1. Read the uploaded file from FormData ────────────
    const formData = await req.formData();
    const file = formData.get('file');

    // ── 2. Validate the file ───────────────────────────────
    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    if (!file.name.toLowerCase().endsWith('.pdf')) {
      return NextResponse.json(
        { error: 'Only PDF files are allowed' },
        { status: 400 }
      );
    }

    if (file.size > 15 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'File size exceeds 15MB limit' },
        { status: 400 }
      );
    }

    // ── 3. Convert file to Buffer and parse with pdf-parse ─
    const buffer = Buffer.from(await file.arrayBuffer());
    const parsed = await pdfParse(buffer);

    if (!parsed.text?.trim()) {
      return NextResponse.json(
        { error: 'PDF appears to be empty or scanned (no extractable text found). Try a text-based PDF.' },
        { status: 400 }
      );
    }

    // ── 4. Clean the extracted text ────────────────────────
    const cleanText = parsed.text
      .replace(/\r\n/g, '\n')       // normalize line endings
      .replace(/\n{3,}/g, '\n\n')   // collapse triple+ blank lines
      .trim();

    // ── 5. Chunk the text for RAG ──────────────────────────
    // 800 chars per chunk, 150 char overlap between chunks
    const chunks = chunkText(cleanText, 800, 150);

    // ── 6. Extract metadata ────────────────────────────────
    const info = parsed.info || {};
    const metadata = {
      title:      info.Title   || file.name.replace(/\.pdf$/i, ''),
      author:     info.Author  || 'Unknown',
      subject:    info.Subject || '',
      pageCount:  parsed.numpages,
      wordCount:  cleanText.split(/\s+/).filter(Boolean).length,
      charCount:  cleanText.length,
      chunkCount: chunks.length,
    };

    // ── 7. Return everything ───────────────────────────────
    return NextResponse.json({
      success:  true,
      filename: file.name,
      pdfText:  cleanText,   // full text (kept on client for fallback)
      chunks,                // array of { id, text, start, end }
      metadata,              // title, author, pages, words, etc.
    });

  } catch (err) {
    console.error('[upload/route.js] Error:', err);
    return NextResponse.json(
      { error: err.message || 'Failed to process PDF' },
      { status: 500 }
    );
  }
}