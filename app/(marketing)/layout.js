// ============================================================
// app/(marketing)/layout.js
// Shared layout for: /home, /history, /about, /upload
// Includes Navbar (which has the theme toggle) + Footer.
// ============================================================

import Navbar from '../components/Navbar';

export default function MarketingLayout({ children }) {
  return (
    <div style={{
      minHeight:     '100vh',
      display:       'flex',
      flexDirection: 'column',
      background:    'var(--bg)',
      overflowY:     'auto',
      overflowX:     'hidden',
    }}>
      <Navbar />
      <main style={{ flex: 1 }}>
        {children}
      </main>

      <footer style={{
        borderTop:      '1px solid var(--border)',
        padding:        '20px 32px',
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'space-between',
        fontSize:       12,
        color:          'var(--text3)',
        fontFamily:     'var(--font-mono)',
        background:     'var(--footer-bg)',
        flexWrap:       'wrap',
        gap:            10,
      }}>
        <span>⚡ Neural PDF · AI Document Intelligence</span>
        <span>Built with Next.js · Groq · LLaMA 3.3 70B</span>
      </footer>
    </div>
  );
}