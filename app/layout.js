// ============================================================
// app/layout.js
// Root layout — wraps every page with the ThemeProvider so
// the theme toggle works globally across all pages.
// ============================================================

import './globals.css';
import { ThemeProvider } from './lib/ThemeContext';

export const metadata = {
  title: 'Neural PDF — AI Document Intelligence',
  description: 'Upload any PDF and ask questions powered by LLaMA 3.3 70B via Groq',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="dark">
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}