// ============================================================
// app/components/ChatMessage.js  — Fully theme-aware
// ============================================================

'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm    from 'remark-gfm';

export default function ChatMessage({ message }) {
  const isUser      = message.role === 'user';
  const isStreaming  = message.streaming;

  return (
    <div
      className="fade-up"
      style={{
        display: 'flex', flexDirection: 'column',
        alignItems: isUser ? 'flex-end' : 'flex-start',
        marginBottom: 16, gap: 4,
      }}
    >
      {/* Role label */}
      <div style={{
        fontSize: 10, fontWeight: 700, letterSpacing: 1.2, textTransform: 'uppercase',
        color: isUser ? 'var(--accent2)' : 'var(--text3)',
        fontFamily: 'var(--font-mono)', paddingInline: 4,
      }}>
        {isUser ? 'You' : 'Neural PDF'}
      </div>

      {/* Bubble */}
      <div style={{
        maxWidth:     '80%',
        padding:      '12px 16px',
        borderRadius: isUser ? '16px 4px 16px 16px' : '4px 16px 16px 16px',
        background:   isUser ? 'var(--btn-primary-bg)' : 'var(--surface2)',
        border:       isUser ? 'none' : '1px solid var(--border)',
        color:        isUser ? '#fff' : 'var(--text)',
        fontSize:     14,
        lineHeight:   1.7,
        boxShadow:    isUser ? '0 4px 20px rgba(108,99,255,0.25)' : 'none',
      }}>
        {isUser ? (
          <span>{message.content}</span>
        ) : (
          <>
            <div className="markdown-body">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{message.content || ''}</ReactMarkdown>
            </div>
            {isStreaming && (
              <span style={{
                display: 'inline-block', width: 8, height: 16,
                background: 'var(--accent)', marginLeft: 2,
                verticalAlign: 'middle', animation: 'blink 0.7s step-end infinite', borderRadius: 2,
              }} />
            )}
          </>
        )}
      </div>

      {/* Citations */}
      {!isUser && message.citations && message.citations.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, maxWidth: '80%', paddingInline: 4 }}>
          {message.citations.map((citation, index) => (
            <div
              key={index}
              title={`Source: ${citation.preview}`}
              style={{
                fontSize: 10, fontFamily: 'var(--font-mono)', padding: '3px 8px',
                background: 'var(--badge-bg)', border: '1px solid var(--badge-border)',
                borderRadius: 20, color: 'var(--badge-text)', cursor: 'default',
              }}
            >
              📄 pg. {citation.page}
            </div>
          ))}
        </div>
      )}

      {/* Timestamp */}
      <div style={{ fontSize: 10, color: 'var(--text3)', fontFamily: 'var(--font-mono)', paddingInline: 4 }}>
        {message.time}
      </div>
    </div>
  );
}