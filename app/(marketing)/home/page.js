// ============================================================
// app/(marketing)/home/page.js   →  URL: /home
// Landing page — fully theme-aware via CSS variables.
// ============================================================

import Link from 'next/link';

const FEATURES = [
  { icon: '🧠', title: 'RAG-Powered Q&A',   desc: 'Ask any question about your PDF. The retrieval system finds the most relevant sections and cites page numbers in every answer.' },
  { icon: '⚡', title: 'Lightning Fast',     desc: "Powered by Groq's LLaMA 3.3 70B — one of the fastest LLMs available. Responses stream to you in real time." },
  { icon: '📄', title: 'Smart Chunking',     desc: 'Documents are split into overlapping chunks for precise retrieval, even across 300+ page research papers.' },
];

const STEPS = [
  { step: '01', title: 'Upload your PDF',    desc: 'Drag and drop or click to upload any text-based PDF up to 15 MB.' },
  { step: '02', title: 'AI indexes the doc', desc: 'The document is chunked and stored in memory for RAG retrieval.' },
  { step: '03', title: 'Ask anything',       desc: 'Type your question and get a cited, accurate answer in seconds.'  },
];

export default function HomePage() {
  return (
    <div>

      {/* ── Hero ─────────────────────────────────────────── */}
      <section style={{ maxWidth: '760px', margin: '0 auto', padding: '80px 32px 64px', textAlign: 'center' }}>

        {/* Live badge */}
        <div style={{
          display:       'inline-flex',
          alignItems:    'center',
          gap:           8,
          padding:       '6px 16px',
          background:    'var(--badge-bg)',
          border:        '1px solid var(--badge-border)',
          borderRadius:  '999px',
          fontSize:      12,
          color:         'var(--badge-text)',
          fontFamily:    'var(--font-mono)',
          marginBottom:  28,
          letterSpacing: 0.5,
        }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--success)', display: 'inline-block' }} />
          Powered by LLaMA 3.3 · 70B via Groq
        </div>

        {/* Headline */}
        <h1 style={{
          fontFamily:   'var(--font-display)',
          fontWeight:   800,
          fontSize:     'clamp(30px, 6vw, 54px)',
          lineHeight:   1.15,
          color:        'var(--text)',
          marginBottom: 20,
        }}>
          Ask anything about{' '}
          <span style={{
            background:           'linear-gradient(135deg, var(--accent2), var(--accent))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor:  'transparent',
          }}>
            any PDF
          </span>
        </h1>

        {/* Sub-headline */}
        <p style={{ fontSize: 17, color: 'var(--text2)', lineHeight: 1.7, maxWidth: 500, margin: '0 auto 40px', fontFamily: 'var(--font-display)' }}>
          Neural PDF uses Retrieval-Augmented Generation to extract precise
          answers from your documents — with page-level citations every time.
        </p>

        {/* CTA Buttons */}
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/chat" style={{
            textDecoration: 'none',
            padding:        '13px 30px',
            background:     'var(--btn-primary-bg)',
            borderRadius:   '10px',
            color:          'var(--btn-primary-text)',
            fontFamily:     'var(--font-display)',
            fontWeight:     600,
            fontSize:       15,
            boxShadow:      '0 4px 20px rgba(108,99,255,0.35)',
            display:        'inline-block',
          }}>
            Open Chat App →
          </Link>
          <Link href="/about" style={{
            textDecoration: 'none',
            padding:        '13px 30px',
            background:     'var(--btn-ghost-bg)',
            border:         '1px solid var(--btn-ghost-border)',
            borderRadius:   '10px',
            color:          'var(--btn-ghost-text)',
            fontFamily:     'var(--font-display)',
            fontWeight:     500,
            fontSize:       15,
            display:        'inline-block',
          }}>
            Learn more
          </Link>
        </div>
      </section>

      {/* ── Feature Cards ─────────────────────────────────── */}
      <section style={{ maxWidth: '900px', margin: '0 auto', padding: '0 32px 80px' }}>
        <h2 style={{
          fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 22,
          color: 'var(--text)', textAlign: 'center', marginBottom: 36,
        }}>
          Why Neural PDF?
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20 }}>
          {FEATURES.map(({ icon, title, desc }) => (
            <div key={title} style={{
              background:   'var(--card-bg)',
              border:       '1px solid var(--card-border)',
              borderRadius: '14px',
              padding:      '24px',
              transition:   'border-color 0.2s, transform 0.2s, box-shadow 0.2s',
              cursor:       'default',
            }}
              // onMouseEnter={e => {
              //   e.currentTarget.style.borderColor = 'var(--card-hover-border)';
              //   e.currentTarget.style.transform = 'translateY(-3px)';
              //   e.currentTarget.style.boxShadow = 'var(--shadow)';
              // }}
              // onMouseLeave={e => {
              //   e.currentTarget.style.borderColor = 'var(--card-border)';
              //   e.currentTarget.style.transform = 'translateY(0)';
              //   e.currentTarget.style.boxShadow = 'none';
              // }}
            >
              <div style={{ fontSize: 28, marginBottom: 12 }}>{icon}</div>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 16, color: 'var(--text)', marginBottom: 8 }}>{title}</div>
              <div style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.65 }}>{desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── How it Works ──────────────────────────────────── */}
      <section style={{ borderTop: '1px solid var(--border)', background: 'var(--surface)', padding: '64px 32px' }}>
        <div style={{ maxWidth: '680px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 22, color: 'var(--text)', marginBottom: 44 }}>
            How it works
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
            {STEPS.map(({ step, title, desc }) => (
              <div key={step} style={{ display: 'flex', alignItems: 'flex-start', gap: 20, textAlign: 'left' }}>
                <div style={{
                  minWidth: 48, height: 48, borderRadius: '12px',
                  background: 'var(--badge-bg)', border: '1px solid var(--badge-border)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 13, color: 'var(--badge-text)',
                }}>
                  {step}
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 15, color: 'var(--text)', marginBottom: 4 }}>{title}</div>
                  <div style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.65 }}>{desc}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 52 }}>
            <Link href="/chat" style={{
              textDecoration: 'none', padding: '12px 28px',
              background: 'var(--btn-primary-bg)', borderRadius: '10px',
              color: 'var(--btn-primary-text)', fontFamily: 'var(--font-display)',
              fontWeight: 600, fontSize: 14, display: 'inline-block',
              boxShadow: '0 4px 20px rgba(108,99,255,0.3)',
            }}>
              Try it now — it&apos;s free
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}