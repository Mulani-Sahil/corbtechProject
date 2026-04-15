// ============================================================
// app/(marketing)/upload/page.js   →  URL: /upload
// Fully theme-aware via CSS variables.
// ============================================================

import Link from 'next/link';

const TIPS = [
  'Use text-based PDFs (not scanned images)',
  'Max file size is 15 MB',
  'Larger files take a few extra seconds to process',
  'After upload, just type your question naturally',
  'Answers include page citations automatically',
];

export default function UploadPage() {
  return (
    <div style={{ maxWidth: '580px', margin: '0 auto', padding: '64px 32px', textAlign: 'center' }}>

      {/* Icon */}
      <div style={{
        width: 72, height: 72, borderRadius: '18px',
        background: 'var(--badge-bg)', border: '1px solid var(--badge-border)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 32, margin: '0 auto 24px',
      }}>
        📄
      </div>

      <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 28, color: 'var(--text)', marginBottom: 12 }}>
        Upload a PDF
      </h1>

      <p style={{ fontSize: 14, color: 'var(--text2)', lineHeight: 1.7, marginBottom: 36 }}>
        The full upload and chat interface is in the main app.
        Click below to open it — you can drag and drop your PDF directly into the chat window.
      </p>

      <Link href="/chat" style={{
        textDecoration: 'none', padding: '13px 30px',
        background: 'var(--btn-primary-bg)', borderRadius: '10px',
        color: 'var(--btn-primary-text)', fontFamily: 'var(--font-display)',
        fontWeight: 600, fontSize: 15,
        boxShadow: '0 4px 20px rgba(108,99,255,0.35)', display: 'inline-block',
      }}>
        Open Chat App →
      </Link>

      {/* Tips card */}
      <div style={{
        marginTop: 40, background: 'var(--card-bg)',
        border: '1px solid var(--card-border)', borderRadius: '14px', padding: '24px', textAlign: 'left',
      }}>
        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 14, color: 'var(--text)', marginBottom: 16 }}>
          📋 Quick Tips
        </div>
        {TIPS.map((tip, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: i < TIPS.length - 1 ? 10 : 0 }}>
            <span style={{ color: 'var(--success)', fontSize: 12, marginTop: 2, flexShrink: 0 }}>✓</span>
            <span style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.5 }}>{tip}</span>
          </div>
        ))}
      </div>
    </div>
  );
}