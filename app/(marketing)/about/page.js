// ============================================================
// app/(marketing)/about/page.js   →  URL: /about
// Fully theme-aware via CSS variables.
// ============================================================

const TECH_STACK = [
  { category: 'Frontend', items: [
    { name: 'Next.js 14',     desc: 'App Router, Server Components, API Routes' },
    { name: 'React 18',       desc: 'Hooks, Streaming UI, Client Components'    },
    { name: 'Tailwind CSS',   desc: 'Utility-first styling via CSS variables'   },
    { name: 'React Markdown', desc: 'Renders AI responses with full markdown'   },
  ]},
  { category: 'AI & Backend', items: [
    { name: 'Groq API',         desc: 'Ultra-fast LLM inference via REST'            },
    { name: 'LLaMA 3.3 · 70B', desc: "Meta's flagship open-source language model"   },
    { name: 'pdf-parse',        desc: 'Node.js PDF text extraction library'          },
    { name: 'RAG Pipeline',     desc: 'Custom chunking + cosine similarity retrieval' },
  ]},
  { category: 'Architecture', items: [
    { name: 'Streaming SSE', desc: 'Server-Sent Events for real-time token streaming'  },
    { name: 'Chunked RAG',   desc: '500-token overlapping chunks with top-K retrieval' },
    { name: 'localStorage',  desc: 'Browser-based session history persistence'         },
    { name: 'FormData API',  desc: 'Multipart PDF upload without third-party libs'     },
  ]},
];

const TEAM = [
  { name: 'Project Developer', role: 'Full-Stack & AI Integration',    emoji: '👨‍💻' },
  { name: 'College Project',   role: 'B.Sc Computer Science', emoji: '🎓' },
];

export default function AboutPage() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '48px 32px 64px' }}>

      {/* Badge + Header */}
      <div style={{ marginBottom: 48 }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          padding: '5px 14px', background: 'var(--badge-bg)',
          border: '1px solid var(--badge-border)', borderRadius: '999px',
          fontSize: 11, color: 'var(--badge-text)', fontFamily: 'var(--font-mono)',
          marginBottom: 20, letterSpacing: 0.5,
        }}>
          College Project · 2025
        </div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 32, color: 'var(--text)', marginBottom: 16, lineHeight: 1.2 }}>
          About Neural PDF
        </h1>
        <p style={{ fontSize: 15, color: 'var(--text2)', lineHeight: 1.75, maxWidth: 600 }}>
          Neural PDF is an AI-powered document intelligence tool built as a college capstone project.
          Upload any PDF and ask natural-language questions — the AI retrieves the most relevant
          sections and answers with page-level citations.
        </p>
      </div>

      {/* RAG explanation */}
      <div style={{
        background: 'var(--card-bg)', border: '1px solid var(--card-border)',
        borderRadius: '14px', padding: '28px', marginBottom: 44,
      }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 18, color: 'var(--text)', marginBottom: 14 }}>
          What is RAG?
        </h2>
        <p style={{ fontSize: 14, color: 'var(--text2)', lineHeight: 1.75, marginBottom: 12 }}>
          <strong style={{ color: 'var(--accent2)' }}>Retrieval-Augmented Generation (RAG)</strong> combines
          a search/retrieval system with a large language model. Instead of sending an entire PDF to the AI,
          we split the document into small chunks, find the most relevant ones for each question, and send
          only those to the model.
        </p>
        <p style={{ fontSize: 14, color: 'var(--text2)', lineHeight: 1.75 }}>
          This makes answers more accurate, faster, and cheaper — and allows citing the specific pages
          the information came from.
        </p>
      </div>

      {/* Tech Stack */}
      <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 20, color: 'var(--text)', marginBottom: 24 }}>
        Tech Stack
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginBottom: 48 }}>
        {TECH_STACK.map(({ category, items }) => (
          <div key={category} style={{
            background: 'var(--card-bg)', border: '1px solid var(--card-border)',
            borderRadius: '14px', overflow: 'hidden',
          }}>
            <div style={{
              padding: '11px 20px', borderBottom: '1px solid var(--border)',
              fontSize: 11, fontFamily: 'var(--font-mono)', fontWeight: 700,
              color: 'var(--accent2)', textTransform: 'uppercase', letterSpacing: 1,
              background: 'var(--surface2)',
            }}>
              {category}
            </div>
            {items.map(({ name, desc }, i) => (
              <div key={name} style={{
                display: 'flex', alignItems: 'flex-start', gap: 14, padding: '13px 20px',
                borderBottom: i < items.length - 1 ? '1px solid var(--border)' : 'none',
              }}>
                <div style={{ minWidth: 8, height: 8, borderRadius: '50%', background: 'var(--accent)', marginTop: 6, flexShrink: 0 }} />
                <div>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 14, color: 'var(--text)', marginBottom: 2 }}>{name}</div>
                  <div style={{ fontSize: 12, color: 'var(--text3)', lineHeight: 1.5 }}>{desc}</div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Team */}
      <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 20, color: 'var(--text)', marginBottom: 20 }}>
        Team
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
        {TEAM.map(({ name, role, emoji }) => (
          <div key={name} style={{
            background: 'var(--card-bg)', border: '1px solid var(--card-border)',
            borderRadius: '14px', padding: '28px 24px', textAlign: 'center',
          }}>
            <div style={{ fontSize: 36, marginBottom: 12 }}>{emoji}</div>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15, color: 'var(--text)', marginBottom: 4 }}>{name}</div>
            <div style={{ fontSize: 12, color: 'var(--text3)', fontFamily: 'var(--font-mono)' }}>{role}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
