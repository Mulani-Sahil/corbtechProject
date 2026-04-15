// ============================================================
// app/lib/chunker.js
// RAG (Retrieval-Augmented Generation) Utilities
//
// WHY RAG?
//   Instead of sending the entire PDF to the AI (which hits token
//   limits and costs more), we:
//     1. Split the PDF into small overlapping chunks
//     2. Score each chunk against the user's question
//     3. Send only the TOP 5 most relevant chunks to the AI
//
// This means the AI always has the RIGHT context, not all context.
// ============================================================

/**
 * STEP 1 — chunkText
 * Splits a long PDF text string into overlapping chunks.
 *
 * Why overlapping? So sentences at chunk boundaries aren't cut off
 * and lose their meaning.
 *
 * @param {string} text       - Full extracted PDF text
 * @param {number} chunkSize  - Characters per chunk (default 800)
 * @param {number} overlap    - Characters to overlap between chunks (default 150)
 * @returns {Array<{ id, text, start, end }>}
 */
export function chunkText(text, chunkSize = 800, overlap = 150) {
  const chunks = [];
  let start = 0;
  let id = 0;

  while (start < text.length) {
    const end = Math.min(start + chunkSize, text.length);
    const chunk = text.slice(start, end).trim();

    // Skip tiny chunks (likely whitespace / page numbers)
    if (chunk.length > 50) {
      chunks.push({ id, text: chunk, start, end });
      id++;
    }

    if (end === text.length) break;
    start += chunkSize - overlap; // move forward but overlap a bit
  }

  return chunks;
}

/**
 * STEP 2 — retrieveRelevantChunks
 * Keyword-based relevance scoring — no embeddings or external APIs needed.
 * Works entirely free on Vercel's serverless platform.
 *
 * How it works:
 *   - Extract "important" words from the user's question (length > 3)
 *   - Count how many times each word appears in each chunk
 *   - Return top K chunks sorted by score
 *
 * @param {Array}  chunks  - Array of chunk objects from chunkText()
 * @param {string} query   - The user's question
 * @param {number} topK    - How many chunks to return (default 5)
 * @returns {Array} Top K most relevant chunks in original document order
 */
export function retrieveRelevantChunks(chunks, query, topK = 5) {
  // Extract meaningful words from the query (ignore short stop words)
  const queryWords = query
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .split(/\s+/)
    .filter((word) => word.length > 3);

  // If no meaningful words, just return the first N chunks
  if (queryWords.length === 0) {
    return chunks.slice(0, topK);
  }

  // Score every chunk
  const scored = chunks.map((chunk) => {
    const chunkLower = chunk.text.toLowerCase();
    let score = 0;

    for (const word of queryWords) {
      const matches = (chunkLower.match(new RegExp(word, 'g')) || []).length;
      score += matches;
    }

    return { ...chunk, score };
  });

  // Sort by score (highest first), take top K, then restore original order
  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, topK)
    .sort((a, b) => a.id - b.id);
}

/**
 * STEP 3 — estimatePage
 * Approximates which page a chunk of text came from.
 * Uses the chunk's character position relative to total document length.
 *
 * This is an estimate — pdf-parse doesn't give per-page character positions.
 *
 * @param {number} charIndex  - The chunk's start character position in the full text
 * @param {number} totalChars - Total character count of the full document
 * @param {number} totalPages - Total page count from pdf-parse
 * @returns {number} Estimated page number (1-indexed)
 */
export function estimatePage(charIndex, totalChars, totalPages) {
  if (!totalPages || !totalChars) return 1;
  const ratio = charIndex / totalChars;
  return Math.max(1, Math.min(totalPages, Math.ceil(ratio * totalPages)));
}
