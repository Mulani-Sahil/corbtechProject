// ============================================================
// app/components/ChatInput.js  — Fully theme-aware
// ============================================================

'use client';

import { useRef, useEffect } from 'react';

export default function ChatInput({ value, onChange, onSend, onAttach, disabled, hasDoc }) {
  const textareaRef = useRef(null);

  useEffect(() => {
    const el = textareaRef.current;
    if (el) { el.style.height = 'auto'; el.style.height = Math.min(el.scrollHeight, 140) + 'px'; }
  }, [value]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); if (!disabled && value.trim()) onSend(); }
  };

  const canSend = !disabled && value.trim().length > 0;

  return (
    <div style={{
      padding: '12px 16px 16px', borderTop: '1px solid var(--border)',
      background: 'var(--header-bg)', flexShrink: 0,
    }}>
      <div style={{
        display: 'flex', alignItems: 'flex-end', gap: 8,
        background: 'var(--input-bg)', border: '1px solid var(--input-border)',
        borderRadius: 'var(--radius)', padding: '8px 12px',
      }}>
        {/* Attach button */}
        <button
          onClick={onAttach}
          title={hasDoc ? 'Replace PDF' : 'Upload PDF'}
          style={{
            background: 'none', border: 'none',
            color: hasDoc ? 'var(--success)' : 'var(--text3)',
            cursor: 'pointer', fontSize: 18, padding: '4px', flexShrink: 0, lineHeight: 1,
          }}
          onMouseEnter={e => e.currentTarget.style.color = 'var(--accent2)'}
          onMouseLeave={e => e.currentTarget.style.color = hasDoc ? 'var(--success)' : 'var(--text3)'}
        >
          📎
        </button>

        {/* Textarea */}
        <textarea
          ref={textareaRef}
          value={value}
          onChange={e => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={hasDoc ? 'Ask anything about your PDF...' : 'Ask me anything...'}
          disabled={disabled}
          rows={1}
          style={{
            flex: 1, background: 'none', border: 'none', outline: 'none',
            color: 'var(--text)', fontFamily: 'var(--font-display)',
            fontSize: 14, lineHeight: 1.6, resize: 'none', maxHeight: '140px', overflowY: 'auto',
          }}
        />

        {/* Send button */}
        <button
          onClick={onSend}
          disabled={!canSend}
          title="Send message (Enter)"
          style={{
            background:   canSend ? 'var(--btn-primary-bg)' : 'var(--surface3)',
            border:       'none',
            borderRadius: 8,
            color:        canSend ? '#fff' : 'var(--text3)',
            cursor:       canSend ? 'pointer' : 'not-allowed',
            width:        36, height: 36, fontSize: 16,
            display:      'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink:   0,
            boxShadow:    canSend ? '0 4px 12px rgba(108,99,255,0.4)' : 'none',
          }}
        >
          ↑
        </button>
      </div>

      <div style={{ fontSize: 10, color: 'var(--text3)', fontFamily: 'var(--font-mono)', marginTop: 6, paddingInline: 4 }}>
        Enter to send · Shift+Enter for new line
      </div>
    </div>
  );
}