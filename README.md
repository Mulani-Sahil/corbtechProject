# ⚡ Neural PDF v2.0

AI-powered PDF intelligence with RAG, streaming, and chat history.  
Built with Next.js · Groq · LLaMA 3.3 70B · 100% JavaScript (no TypeScript).

---

## 📁 Full Project Structure

```
neural-pdf/
│
├── .env.local                          ← Your secret API key goes here (never commit!)
├── .gitignore                          ← Ignores node_modules, .env.local, .next/
├── next.config.js                      ← Next.js config (fixes pdf-parse webpack issues)
├── package.json                        ← Dependencies and npm scripts
│
└── app/                                ← Next.js App Router root
    │
    ├── layout.js                       ← Root layout: sets page title, imports CSS
    ├── globals.css                     ← Design system: colors, fonts, animations
    ├── page.js                         ← MAIN PAGE: all state + component wiring
    │
    ├── lib/
    │   └── chunker.js                  ← RAG engine: split PDF → retrieve relevant chunks
    │
    ├── api/
    │   ├── upload/
    │   │   └── route.js                ← POST /api/upload: parse PDF, extract text, chunk it
    │   └── ask/
    │       └── route.js                ← POST /api/ask: RAG retrieval + Groq streaming
    │
    └── components/
        ├── Sidebar.js                  ← Left panel: new chat, PDF info, session history
        ├── PDFUploader.js              ← Drag-and-drop upload with progress bar
        ├── ChatMessage.js              ← Single message bubble (markdown + citations)
        └── ChatInput.js                ← Textarea with send button + keyboard shortcuts
```

---

## 🚀 How to Run Locally

```bash
# 1. Install dependencies
npm install

# 2. Add your Groq API key to .env.local
# Get a free key at https://console.groq.com
echo "GROQ_API_KEY=your_key_here" > .env.local

# 3. Start the development server
npm run dev

# 4. Open http://localhost:3000
```

---

## 🧠 How RAG Works (for your college presentation)

**RAG = Retrieval-Augmented Generation**

The problem with naive PDF chatbots: they dump the entire PDF into the AI prompt.  
This hits token limits, costs more, and gives worse answers.

**Neural PDF's approach:**

```
1. Upload PDF
      ↓
2. pdf-parse extracts all text
      ↓
3. chunker.js splits text into 800-char chunks (150-char overlap)
   Example: 50-page PDF → ~300 chunks
      ↓
4. User asks a question
      ↓
5. chunker.js scores every chunk: how many question keywords appear?
      ↓
6. Top 5 most relevant chunks selected
      ↓
7. Only those 5 chunks sent to LLaMA as context (~4000 chars vs 50,000)
      ↓
8. LLaMA answers using only the RIGHT context
      ↓
9. Page numbers estimated from chunk position → shown as citation badges
```

---

## ⚡ Streaming (Server-Sent Events)

Instead of waiting 5-10 seconds for a full answer:

```
Frontend                    Backend (route.js)           Groq API
   |                              |                          |
   |── POST /api/ask ────────────>|                          |
   |                              |── stream request ───────>|
   |                              |<── token "The" ─────────|
   |<── data: {"token":"The"} ───|                          |
   |                              |<── token " document" ───|
   |<── data: {"token":" doc"} ─|                          |
   |  [text appears live in UI]   |        ... etc ...       |
```

---

## 🎨 Features Summary

| Feature | Description |
|---|---|
| 📄 PDF Upload | Drag-and-drop or click, up to 15MB |
| 🧩 RAG Chunking | 800-char chunks, 150-char overlap |
| 🔍 Smart Retrieval | Keyword scoring, top 5 chunks per question |
| 📍 Page Citations | Estimated page number shown per answer |
| ⚡ Streaming | Tokens appear word-by-word in real time |
| 💬 Multi-turn | Remembers last 6 messages for context |
| 🗂️ History | Session titles saved in localStorage |
| 📊 Metadata | Title, author, pages, word count displayed |
| 🌑 Dark Mode | Full dark theme design system |

---

## 🔧 Tech Stack

- **Next.js 14** — App Router, server components, API routes
- **Groq SDK** — Ultra-fast LLaMA 3.3 70B inference
- **pdf-parse** — PDF text extraction (Node.js)
- **react-markdown + remark-gfm** — Markdown rendering in chat
- **Custom RAG** — Keyword-based chunking (no paid vector DB)

---

## 📦 Deploy to Vercel

```bash
# Push to GitHub, then connect repo to Vercel
# In Vercel dashboard → Settings → Environment Variables
# Add: GROQ_API_KEY = your_key_here
vercel deploy
```
