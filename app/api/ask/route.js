// ============================================================
// app/api/ask/route.js
// API Route: POST /api/ask
//
// What this does:
//   1. Receives: user question + PDF chunks + chat history
//   2. Runs RAG: retrieves top 5 most relevant PDF chunks
//   3. Builds a smart system prompt with only relevant context
//   4. Calls Groq (LLaMA 3.3 70B) with streaming enabled
//   5. Streams the response back token by token using SSE
//      (Server-Sent Events) — this is what makes text appear live
//
// Why streaming?
//   Instead of waiting 5-10 seconds for the full answer, the user
//   sees words appearing in real-time. Much better UX.
// ============================================================

import Groq from 'groq-sdk';
import { retrieveRelevantChunks, estimatePage } from '../../lib/chunker';

export const runtime = 'nodejs';
export const maxDuration = 60;

// Initialize Groq client (reads GROQ_API_KEY from .env.local)
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(req) {
  try {
    // ── Guard: API key must exist ──────────────────────────
    if (!process.env.GROQ_API_KEY) {
      return new Response(
        JSON.stringify({ error: 'GROQ_API_KEY is not configured in .env.local' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // ── 1. Parse request body ──────────────────────────────
    const { question, chunks, metadata, history } = await req.json();

    if (!question?.trim()) {
      return new Response(
        JSON.stringify({ error: 'Question is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // ── 2. RAG: find relevant chunks + build citations ─────
    let systemPrompt;
    let citations = [];

    if (chunks && chunks.length > 0) {
      // Retrieve top 5 most relevant chunks for this question
      const relevantChunks = retrieveRelevantChunks(chunks, question, 5);

      // Build citation objects (shown as page badges in the UI)
      citations = relevantChunks.map((chunk) => ({
        chunkId: chunk.id,
        page:    estimatePage(chunk.start, metadata?.charCount, metadata?.pageCount),
        preview: chunk.text.slice(0, 120) + '...',
      }));

      // Format chunks as numbered sections for the prompt
      const context = relevantChunks
        .map((c, i) => `[Section ${i + 1}]:\n${c.text}`)
        .join('\n\n---\n\n');

      // System prompt WITH document context
      systemPrompt = `You are Neural PDF, an intelligent document assistant.

ACTIVE DOCUMENT: "${metadata?.title || 'Uploaded PDF'}"
Pages: ${metadata?.pageCount || '?'} | Words: ${(metadata?.wordCount || 0).toLocaleString()}

RELEVANT SECTIONS RETRIEVED FROM THE PDF:
${context}

INSTRUCTIONS:
- If the question is about the document, base your answer on the sections above.
- For general knowledge questions (math, science, coding), use your own knowledge.
- When referencing the PDF, naturally say "The document mentions..." or "According to the PDF..."
- Be clear, concise, and well-structured. Use markdown when helpful.
- If the retrieved sections don't fully answer the question, say so and help as best you can.`;

    } else {
      // System prompt WITHOUT document context
      systemPrompt = `You are Neural PDF, a helpful AI assistant.
No PDF has been uploaded yet. Answer from your general knowledge.
Be clear, concise, and helpful. Use markdown when it improves readability.`;
    }

    // ── 3. Build message array (multi-turn conversation) ───
    const messages = [{ role: 'system', content: systemPrompt }];

    // Include last 6 messages from chat history for context
    if (Array.isArray(history)) {
      for (const msg of history.slice(-6)) {
        messages.push({ role: msg.role, content: msg.content });
      }
    }

    // Add the current question
    messages.push({ role: 'user', content: question });

    // ── 4. Call Groq with streaming ────────────────────────
    const groqStream = await groq.chat.completions.create({
      model:       'llama-3.3-70b-versatile',
      temperature: 0.4,
      max_tokens:  1024,
      stream:      true,   // ← this enables token-by-token streaming
      messages,
    });

    // ── 5. Build a Server-Sent Events (SSE) ReadableStream ─
    // The frontend reads this with a ReadableStream reader
    const encoder = new TextEncoder();

    const readable = new ReadableStream({
      async start(controller) {

        // First chunk: send citation data so UI can show page badges immediately
        if (citations.length > 0) {
          controller.enqueue(
            encoder.encode(
              `data: ${JSON.stringify({ type: 'citations', citations })}\n\n`
            )
          );
        }

        // Stream each token from Groq as it arrives
        for await (const chunk of groqStream) {
          const token = chunk.choices[0]?.delta?.content || '';
          if (token) {
            controller.enqueue(
              encoder.encode(
                `data: ${JSON.stringify({ type: 'token', token })}\n\n`
              )
            );
          }
        }

        // Signal end of stream
        controller.enqueue(encoder.encode('data: [DONE]\n\n'));
        controller.close();
      },
    });

    // Return the stream with SSE headers
    return new Response(readable, {
      headers: {
        'Content-Type':  'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection':    'keep-alive',
      },
    });

  } catch (err) {
    console.error('[ask/route.js] Error:', err);
    return new Response(
      JSON.stringify({ error: err.message || 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}