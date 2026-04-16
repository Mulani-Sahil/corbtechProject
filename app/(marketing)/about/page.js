// // ============================================================
// // app/(marketing)/about/page.js   →  URL: /about
// // Fully theme-aware via CSS variables.
// // ============================================================

// const TECH_STACK = [
//   { category: 'Frontend', items: [
//     { name: 'Next.js 14',     desc: 'App Router, Server Components, API Routes' },
//     { name: 'React 18',       desc: 'Hooks, Streaming UI, Client Components'    },
//     { name: 'Tailwind CSS',   desc: 'Utility-first styling via CSS variables'   },
//     { name: 'React Markdown', desc: 'Renders AI responses with full markdown'   },
//   ]},
//   { category: 'AI & Backend', items: [
//     { name: 'Groq API',         desc: 'Ultra-fast LLM inference via REST'            },
//     { name: 'LLaMA 3.3 · 70B', desc: "Meta's flagship open-source language model"   },
//     { name: 'pdf-parse',        desc: 'Node.js PDF text extraction library'          },
//     { name: 'RAG Pipeline',     desc: 'Custom chunking + cosine similarity retrieval' },
//   ]},
//   { category: 'Architecture', items: [
//     { name: 'Streaming SSE', desc: 'Server-Sent Events for real-time token streaming'  },
//     { name: 'Chunked RAG',   desc: '500-token overlapping chunks with top-K retrieval' },
//     { name: 'localStorage',  desc: 'Browser-based session history persistence'         },
//     { name: 'FormData API',  desc: 'Multipart PDF upload without third-party libs'     },
//   ]},
// ];

// const TEAM = [
//   { name: 'Project Developer', role: 'Full-Stack & AI Integration',    emoji: '👨‍💻' },
//   { name: 'College Project',   role: 'B.Sc Computer Science', emoji: '🎓' },
// ];

// export default function AboutPage() {
//   return (
//     <div style={{ maxWidth: '800px', margin: '0 auto', padding: '48px 32px 64px' }}>

//       {/* Badge + Header */}
//       <div style={{ marginBottom: 48 }}>
//         <div style={{
//           display: 'inline-flex', alignItems: 'center', gap: 8,
//           padding: '5px 14px', background: 'var(--badge-bg)',
//           border: '1px solid var(--badge-border)', borderRadius: '999px',
//           fontSize: 11, color: 'var(--badge-text)', fontFamily: 'var(--font-mono)',
//           marginBottom: 20, letterSpacing: 0.5,
//         }}>
//           College Project · 2025
//         </div>
//         <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 32, color: 'var(--text)', marginBottom: 16, lineHeight: 1.2 }}>
//           About Neural PDF
//         </h1>
//         <p style={{ fontSize: 15, color: 'var(--text2)', lineHeight: 1.75, maxWidth: 600 }}>
//           Neural PDF is an AI-powered document intelligence tool built as a college capstone project.
//           Upload any PDF and ask natural-language questions — the AI retrieves the most relevant
//           sections and answers with page-level citations.
//         </p>
//       </div>

//       {/* RAG explanation */}
//       <div style={{
//         background: 'var(--card-bg)', border: '1px solid var(--card-border)',
//         borderRadius: '14px', padding: '28px', marginBottom: 44,
//       }}>
//         <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 18, color: 'var(--text)', marginBottom: 14 }}>
//           What is RAG?
//         </h2>
//         <p style={{ fontSize: 14, color: 'var(--text2)', lineHeight: 1.75, marginBottom: 12 }}>
//           <strong style={{ color: 'var(--accent2)' }}>Retrieval-Augmented Generation (RAG)</strong> combines
//           a search/retrieval system with a large language model. Instead of sending an entire PDF to the AI,
//           we split the document into small chunks, find the most relevant ones for each question, and send
//           only those to the model.
//         </p>
//         <p style={{ fontSize: 14, color: 'var(--text2)', lineHeight: 1.75 }}>
//           This makes answers more accurate, faster, and cheaper — and allows citing the specific pages
//           the information came from.
//         </p>
//       </div>

//       {/* Tech Stack */}
//       <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 20, color: 'var(--text)', marginBottom: 24 }}>
//         Tech Stack
//       </h2>
//       <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginBottom: 48 }}>
//         {TECH_STACK.map(({ category, items }) => (
//           <div key={category} style={{
//             background: 'var(--card-bg)', border: '1px solid var(--card-border)',
//             borderRadius: '14px', overflow: 'hidden',
//           }}>
//             <div style={{
//               padding: '11px 20px', borderBottom: '1px solid var(--border)',
//               fontSize: 11, fontFamily: 'var(--font-mono)', fontWeight: 700,
//               color: 'var(--accent2)', textTransform: 'uppercase', letterSpacing: 1,
//               background: 'var(--surface2)',
//             }}>
//               {category}
//             </div>
//             {items.map(({ name, desc }, i) => (
//               <div key={name} style={{
//                 display: 'flex', alignItems: 'flex-start', gap: 14, padding: '13px 20px',
//                 borderBottom: i < items.length - 1 ? '1px solid var(--border)' : 'none',
//               }}>
//                 <div style={{ minWidth: 8, height: 8, borderRadius: '50%', background: 'var(--accent)', marginTop: 6, flexShrink: 0 }} />
//                 <div>
//                   <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 14, color: 'var(--text)', marginBottom: 2 }}>{name}</div>
//                   <div style={{ fontSize: 12, color: 'var(--text3)', lineHeight: 1.5 }}>{desc}</div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         ))}
//       </div>

//       {/* Team */}
//       <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 20, color: 'var(--text)', marginBottom: 20 }}>
//         Team
//       </h2>
//       <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
//         {TEAM.map(({ name, role, emoji }) => (
//           <div key={name} style={{
//             background: 'var(--card-bg)', border: '1px solid var(--card-border)',
//             borderRadius: '14px', padding: '28px 24px', textAlign: 'center',
//           }}>
//             <div style={{ fontSize: 36, marginBottom: 12 }}>{emoji}</div>
//             <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15, color: 'var(--text)', marginBottom: 4 }}>{name}</div>
//             <div style={{ fontSize: 12, color: 'var(--text3)', fontFamily: 'var(--font-mono)' }}>{role}</div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// ============================================================
// app/(marketing)/about/page.js   →  URL: /about
// ============================================================

'use client';

import { useEffect, useRef, useState } from 'react';

const STATS = [
  { value: '70B',    label: 'Parameter Model'  },
  { value: '<1s',    label: 'Response Latency'  },
  { value: '15MB',   label: 'Max PDF Size'      },
  { value: '800chr', label: 'Chunk Granularity' },
];

const TECH_STACK = [
  {
    category: 'Frontend',
    color: '#6c63ff',
    items: [
      { name: 'Next.js 14',     desc: 'App Router, Server Components, API Routes' },
      { name: 'React 18',       desc: 'Hooks, streaming UI, client components'    },
      { name: 'React Markdown', desc: 'Renders AI responses with full markdown'   },
    ],
  },
  {
    category: 'AI & Backend',
    color: '#22d3a5',
    items: [
      { name: 'Groq API',          desc: 'Ultra-fast LLM inference'                    },
      { name: 'LLaMA 3.3 · 70B',  desc: "Meta's flagship open-source language model"  },
      { name: 'pdf-parse',         desc: 'Node.js PDF text extraction'                 },
    ],
  },
  {
    category: 'Architecture',
    color: '#f59e0b',
    items: [
      { name: 'Streaming SSE',  desc: 'Server-Sent Events for real-time token output'    },
      { name: 'RAG Pipeline',   desc: '800-char overlapping chunks + keyword retrieval'  },
      { name: 'localStorage',   desc: 'Browser-based multi-session persistence'          },
    ],
  },
];

const TIMELINE = [
  { phase: '01', title: 'Upload',     desc: 'Drop any text-based PDF up to 15MB'                  },
  { phase: '02', title: 'Parse',      desc: 'pdf-parse extracts full plain text on the server'    },
  { phase: '03', title: 'Chunk',      desc: '800-char overlapping windows split the document'     },
  { phase: '04', title: 'Retrieve',   desc: 'Keyword scoring ranks the 5 most relevant chunks'   },
  { phase: '05', title: 'Generate',   desc: 'LLaMA 3.3 70B streams an answer with page citations' },
];

function useInView(threshold = 0.15) {
  const ref  = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function FadeSection({ children, delay = 0 }) {
  const [ref, visible] = useInView();
  return (
    <div ref={ref} style={{
      opacity:    visible ? 1 : 0,
      transform:  visible ? 'none' : 'translateY(24px)',
      transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
    }}>
      {children}
    </div>
  );
}

export default function AboutPage() {
  return (
    <div style={{
      maxWidth:   '860px',
      margin:     '0 auto',
      padding:    'clamp(32px, 6vw, 64px) clamp(16px, 5vw, 40px) 80px',
      fontFamily: 'var(--font-display)',
    }}>

      {/* ── Hero ── */}
      <FadeSection>
        <div style={{ marginBottom: 72 }}>

          {/* Eyebrow */}
          <div style={{
            display:      'inline-flex',
            alignItems:   'center',
            gap:          8,
            marginBottom: 24,
          }}>
            <span style={{
              display:      'inline-block',
              width:        6, height: 6,
              borderRadius: '50%',
              background:   'var(--accent)',
              boxShadow:    '0 0 8px var(--accent)',
              animation:    'pulse-glow 2s ease infinite',
            }} />
            <span style={{
              fontSize:      11,
              fontFamily:    'var(--font-mono)',
              fontWeight:    700,
              color:         'var(--text3)',
              letterSpacing: 2,
              textTransform: 'uppercase',
            }}>
              Built by CORBTECH · 2025
            </span>
          </div>

          {/* Big headline */}
          <h1 style={{
            fontSize:      'clamp(36px, 7vw, 68px)',
            fontWeight:    800,
            lineHeight:    1.05,
            color:         'var(--text)',
            marginBottom:  20,
            letterSpacing: '-0.02em',
          }}>
            Document&nbsp;AI,<br />
            <span style={{
              background:            'linear-gradient(135deg, var(--accent2) 0%, var(--accent) 50%, var(--success) 100%)',
              WebkitBackgroundClip:  'text',
              WebkitTextFillColor:   'transparent',
            }}>
              radically fast.
            </span>
          </h1>

          <p style={{
            fontSize:    'clamp(15px, 2vw, 17px)',
            color:       'var(--text2)',
            lineHeight:  1.8,
            maxWidth:    560,
            marginBottom: 40,
          }}>
            Neural PDF is an AI document intelligence platform developed by CORBTECH.
            Ask any question about any PDF — we retrieve only what matters and stream
            the answer word by word, with page-level citations.
          </p>

          {/* Stats row */}
          <div style={{
            display:             'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))',
            gap:                 12,
          }}>
            {STATS.map(({ value, label }) => (
              <div key={label} style={{
                background:   'var(--surface2)',
                border:       '1px solid var(--border)',
                borderRadius: 12,
                padding:      '18px 16px',
                textAlign:    'center',
              }}>
                <div style={{
                  fontFamily:    'var(--font-mono)',
                  fontSize:      'clamp(18px, 3vw, 24px)',
                  fontWeight:    700,
                  color:         'var(--accent2)',
                  marginBottom:  4,
                  letterSpacing: '-0.01em',
                }}>
                  {value}
                </div>
                <div style={{ fontSize: 10, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: 1 }}>
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </FadeSection>

      {/* ── Divider ── */}
      <div style={{ borderTop: '1px solid var(--border)', marginBottom: 72 }} />

      {/* ── What is RAG ── */}
      <FadeSection delay={0}>
        <div style={{ marginBottom: 72 }}>
          <SectionLabel>The Technology</SectionLabel>
          <h2 style={h2Style}>What is RAG?</h2>

          <div style={{
            display:             'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap:                 16,
            marginTop:           28,
          }}>
            {[
              {
                icon:  '🧩',
                title: 'Chunking',
                body:  'The PDF is split into 800-character windows with 150-character overlaps so no sentence is ever cut mid-thought.',
              },
              {
                icon:  '🔍',
                title: 'Retrieval',
                body:  'Each chunk is scored against your question using keyword frequency. The top 5 most relevant chunks are selected.',
              },
              {
                icon:  '⚡',
                title: 'Generation',
                body:  'Only those ~4,000 characters — not the full 50,000 — are sent to LLaMA. Faster, cheaper, more accurate.',
              },
            ].map(({ icon, title, body }) => (
              <div key={title} style={{
                background:   'var(--surface2)',
                border:       '1px solid var(--border)',
                borderRadius: 14,
                padding:      '24px 22px',
                position:     'relative',
                overflow:     'hidden',
              }}>
                <div style={{
                  position:    'absolute', top: 0, left: 0, right: 0,
                  height:      3,
                  background:  'linear-gradient(90deg, var(--accent), var(--accent2))',
                  borderRadius: '14px 14px 0 0',
                }} />
                <div style={{ fontSize: 28, marginBottom: 12 }}>{icon}</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)', marginBottom: 8 }}>{title}</div>
                <div style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.7 }}>{body}</div>
              </div>
            ))}
          </div>
        </div>
      </FadeSection>

      {/* ── How it works timeline ── */}
      <FadeSection delay={0}>
        <div style={{ marginBottom: 72 }}>
          <SectionLabel>Pipeline</SectionLabel>
          <h2 style={h2Style}>How it works</h2>

          <div style={{
            marginTop:     28,
            position:      'relative',
            paddingLeft:   40,
            borderLeft:    '2px solid var(--border)',
          }}>
            {TIMELINE.map(({ phase, title, desc }, i) => (
              <div key={phase} style={{
                position:     'relative',
                paddingBottom: i < TIMELINE.length - 1 ? 28 : 0,
              }}>
                {/* dot */}
                <div style={{
                  position:     'absolute',
                  left:         -49,
                  top:          2,
                  width:        14, height: 14,
                  borderRadius: '50%',
                  background:   'var(--accent)',
                  border:       '3px solid var(--bg)',
                  boxShadow:    '0 0 0 1px var(--accent)',
                }} />
                <div style={{
                  fontFamily:    'var(--font-mono)',
                  fontSize:      10,
                  color:         'var(--accent)',
                  letterSpacing: 1.5,
                  marginBottom:  4,
                  textTransform: 'uppercase',
                }}>
                  Step {phase}
                </div>
                <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)', marginBottom: 4 }}>
                  {title}
                </div>
                <div style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.6 }}>
                  {desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </FadeSection>

      {/* ── Tech Stack ── */}
      <FadeSection delay={0}>
        <div style={{ marginBottom: 72 }}>
          <SectionLabel>Stack</SectionLabel>
          <h2 style={h2Style}>Built with</h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 28 }}>
            {TECH_STACK.map(({ category, color, items }) => (
              <div key={category} style={{
                background:   'var(--surface2)',
                border:       '1px solid var(--border)',
                borderRadius: 14,
                overflow:     'hidden',
              }}>
                <div style={{
                  padding:        '10px 20px',
                  borderBottom:   '1px solid var(--border)',
                  background:     'var(--surface3)',
                  display:        'flex',
                  alignItems:     'center',
                  gap:            8,
                }}>
                  <span style={{
                    display:      'inline-block',
                    width:        8, height: 8,
                    borderRadius: '50%',
                    background:   color,
                  }} />
                  <span style={{
                    fontSize:      10,
                    fontFamily:    'var(--font-mono)',
                    fontWeight:    700,
                    color:         'var(--text2)',
                    textTransform: 'uppercase',
                    letterSpacing: 1.5,
                  }}>
                    {category}
                  </span>
                </div>
                {items.map(({ name, desc }, i) => (
                  <div key={name} style={{
                    display:       'flex',
                    alignItems:    'center',
                    justifyContent: 'space-between',
                    gap:           12,
                    padding:       '13px 20px',
                    borderBottom:  i < items.length - 1 ? '1px solid var(--border)' : 'none',
                    flexWrap:      'wrap',
                  }}>
                    <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)', flexShrink: 0 }}>
                      {name}
                    </span>
                    <span style={{
                      fontSize:   12,
                      color:      'var(--text3)',
                      fontFamily: 'var(--font-mono)',
                      textAlign:  'right',
                    }}>
                      {desc}
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </FadeSection>

      {/* ── CORBTECH card ── */}
      <FadeSection delay={0}>
        <div style={{ marginBottom: 0 }}>
          <SectionLabel>The Team</SectionLabel>
          <h2 style={h2Style}>CORBTECH</h2>

          <div style={{
            marginTop:    28,
            background:   'var(--surface2)',
            border:       '1px solid var(--border)',
            borderRadius: 20,
            overflow:     'hidden',
            position:     'relative',
          }}>
            {/* decorative gradient top stripe */}
            <div style={{
              height:     4,
              background: 'linear-gradient(90deg, var(--accent) 0%, var(--accent2) 40%, var(--success) 100%)',
            }} />

            <div style={{
              padding:   'clamp(28px, 5vw, 48px)',
              display:   'flex',
              gap:       32,
              flexWrap:  'wrap',
              alignItems: 'flex-start',
            }}>
              {/* Logo block */}
              <div style={{
                width:          80, height: 80,
                borderRadius:   16,
                background:     'linear-gradient(135deg, var(--accent), var(--accent2))',
                display:        'flex',
                alignItems:     'center',
                justifyContent: 'center',
                fontSize:       36,
                flexShrink:     0,
                boxShadow:      'var(--shadow-accent)',
              }}>
                🔬
              </div>

              {/* Text */}
              <div style={{ flex: 1, minWidth: 200 }}>
                <div style={{
                  fontFamily:    'var(--font-display)',
                  fontWeight:    800,
                  fontSize:      'clamp(22px, 4vw, 30px)',
                  color:         'var(--text)',
                  letterSpacing: '-0.02em',
                  marginBottom:  6,
                }}>
                  CORBTECH
                </div>
                <div style={{
                  fontSize:   11,
                  fontFamily: 'var(--font-mono)',
                  color:      'var(--accent)',
                  letterSpacing: 2,
                  textTransform: 'uppercase',
                  marginBottom: 16,
                }}>
                  B.Sc Computer Science · 2026
                </div>
                <p style={{
                  fontSize:    14,
                  color:       'var(--text2)',
                  lineHeight:  1.8,
                  maxWidth:    520,
                  marginBottom: 20,
                }}>
                  CORBTECH is a student engineering collective building full-stack AI products.
                  Neural PDF is our capstone project — a real-world RAG system that showcases
                  document intelligence, streaming inference, and modern web architecture.
                </p>

                {/* Pill badges */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {['AI/ML', 'Full-Stack', 'Next.js', 'LLM Integration', 'RAG Systems'].map(tag => (
                    <span key={tag} style={{
                      fontSize:    11,
                      fontFamily:  'var(--font-mono)',
                      padding:     '4px 10px',
                      background:  'var(--badge-bg)',
                      border:      '1px solid var(--badge-border)',
                      borderRadius: 20,
                      color:       'var(--badge-text)',
                    }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom strip — mission */}
            <div style={{
              borderTop:   '1px solid var(--border)',
              padding:     '16px clamp(28px, 5vw, 48px)',
              background:  'var(--surface3)',
              fontSize:    12,
              color:       'var(--text3)',
              fontFamily:  'var(--font-mono)',
              fontStyle:   'italic',
            }}>
              "Build things that work. Ship things that matter."
            </div>
          </div>
        </div>
      </FadeSection>

    </div>
  );
}

/* ── Shared style helpers ── */
const h2Style = {
  fontFamily:    'var(--font-display)',
  fontWeight:    800,
  fontSize:      'clamp(20px, 3.5vw, 26px)',
  color:         'var(--text)',
  letterSpacing: '-0.01em',
  marginTop:     8,
};

function SectionLabel({ children }) {
  return (
    <div style={{
      fontSize:      10,
      fontFamily:    'var(--font-mono)',
      fontWeight:    700,
      color:         'var(--text3)',
      letterSpacing: 2,
      textTransform: 'uppercase',
    }}>
      {children}
    </div>
  );
}
