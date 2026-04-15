// ============================================================
// app/components/Sidebar.js  — Fully theme-aware
// All hardcoded colors replaced with CSS variables.
// ============================================================

'use client';

import { useState } from 'react';

export default function Sidebar({ metadata, sessions, currentSession, onNewChat, onSelectSession, onClearAll }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside style={{
      width:         collapsed ? '60px' : '260px',
      minWidth:      collapsed ? '60px' : '260px',
      background:    'var(--sidebar-bg)',
      borderRight:   '1px solid var(--border)',
      display:       'flex',
      flexDirection: 'column',
      transition:    'width 0.3s ease, min-width 0.3s ease',
      overflow:      'hidden',
    }}>

      {/* Logo + collapse */}
      <div style={{
        padding: '20px 16px', borderBottom: '1px solid var(--border)',
        display: 'flex', alignItems: 'center', gap: 10,
        justifyContent: collapsed ? 'center' : 'space-between',
      }}>
        {!collapsed && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 20 }}>⚡</span>
            <span style={{
              fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 16,
              background: 'linear-gradient(135deg, var(--accent2), var(--accent))',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', whiteSpace: 'nowrap',
            }}>
              Neural PDF
            </span>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          style={{
            background: 'none', border: 'none', color: 'var(--text3)',
            cursor: 'pointer', padding: 4, borderRadius: 6,
            fontSize: 18, lineHeight: 1, transition: 'color 0.2s', flexShrink: 0,
          }}
          onMouseEnter={e => e.currentTarget.style.color = 'var(--text)'}
          onMouseLeave={e => e.currentTarget.style.color = 'var(--text3)'}
        >
          {collapsed ? '›' : '‹'}
        </button>
      </div>

      {/* New Chat */}
      <div style={{ padding: '12px 10px 6px' }}>
        <button
          onClick={onNewChat}
          title="New Chat"
          style={{
            width: '100%', background: 'var(--accent-glow)', border: '1px solid var(--accent)',
            borderRadius: 'var(--radius-sm)', color: 'var(--accent2)',
            fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 13,
            padding: collapsed ? '10px' : '10px 14px', cursor: 'pointer',
            display: 'flex', alignItems: 'center',
            justifyContent: collapsed ? 'center' : 'flex-start',
            gap: 8, whiteSpace: 'nowrap',
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'var(--badge-bg)'}
          onMouseLeave={e => e.currentTarget.style.background = 'var(--accent-glow)'}
        >
          <span style={{ fontSize: 16 }}>+</span>
          {!collapsed && 'New Chat'}
        </button>
      </div>

      {/* Active PDF Metadata */}
      {metadata && !collapsed && (
        <div className="slide-in" style={{
          margin: '6px 10px', padding: '12px',
          background: 'var(--surface2)', border: '1px solid var(--border)',
          borderRadius: 'var(--radius-sm)',
        }}>
          <div style={{
            fontSize: 10, fontWeight: 700, color: 'var(--accent)',
            letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 8, fontFamily: 'var(--font-mono)',
          }}>
            Active Document
          </div>
          <div title={metadata.title} style={{
            fontSize: 13, fontWeight: 600, color: 'var(--text)', marginBottom: 6,
            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
          }}>
            📄 {metadata.title}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4, fontSize: 11, color: 'var(--text2)', fontFamily: 'var(--font-mono)' }}>
            <span>{metadata.pageCount} pages</span>
            <span>{(metadata.wordCount || 0).toLocaleString()} words</span>
            <span>{metadata.chunkCount} chunks</span>
            <span style={{ color: 'var(--success)' }}>✓ RAG ready</span>
          </div>
        </div>
      )}

      {/* History */}
      {!collapsed && (
        <div style={{ flex: 1, overflowY: 'auto', padding: '6px 10px' }}>
          {sessions.length > 0 && (
            <>
              <div style={{
                fontSize: 10, fontWeight: 700, color: 'var(--text3)',
                letterSpacing: 1.5, textTransform: 'uppercase',
                padding: '8px 4px 6px', fontFamily: 'var(--font-mono)',
              }}>
                History
              </div>
              {sessions.map(session => (
                <button
                  key={session.id}
                  onClick={() => onSelectSession(session.id)}
                  title={session.title}
                  style={{
                    width: '100%',
                    background:   session.id === currentSession ? 'var(--surface3)' : 'none',
                    border:       session.id === currentSession ? '1px solid var(--border2)' : '1px solid transparent',
                    borderRadius: 'var(--radius-sm)',
                    color:        session.id === currentSession ? 'var(--text)' : 'var(--text2)',
                    fontFamily:   'var(--font-display)', fontSize: 12,
                    padding:      '8px 10px', cursor: 'pointer', textAlign: 'left',
                    marginBottom: 2, overflow: 'hidden', textOverflow: 'ellipsis',
                    whiteSpace:   'nowrap', transition: 'all 0.15s',
                  }}
                  onMouseEnter={e => { if (session.id !== currentSession) e.currentTarget.style.background = 'var(--surface2)'; }}
                  onMouseLeave={e => { if (session.id !== currentSession) e.currentTarget.style.background = 'none'; }}
                >
                  💬 {session.title}
                </button>
              ))}
              <button
                onClick={onClearAll}
                style={{
                  marginTop: 8, width: '100%', background: 'none', border: 'none',
                  color: 'var(--text3)', fontSize: 11, cursor: 'pointer',
                  fontFamily: 'var(--font-mono)', padding: '4px', textAlign: 'left',
                }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--danger)'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--text3)'}
              >
                Clear history
              </button>
            </>
          )}
        </div>
      )}

      {/* Footer */}
      {!collapsed && (
        <div style={{
          padding: '12px 14px', borderTop: '1px solid var(--border)',
          fontSize: 10, color: 'var(--text3)', fontFamily: 'var(--font-mono)', lineHeight: 1.8,
        }}>
          Powered by Groq<br />LLaMA 3.3 · 70B
        </div>
      )}
    </aside>
  );
}