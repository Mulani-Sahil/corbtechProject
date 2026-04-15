// ============================================================
// app/chat/page.js   →  URL: /chat
// Main chat application — fully theme-aware.
// Theme toggle button added to the header bar.
// ============================================================

'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Sidebar     from '../components/Sidebar';
import PDFUploader from '../components/PDFUploader';
import ChatMessage from '../components/ChatMessage';
import ChatInput   from '../components/ChatInput';
import { useTheme } from '../lib/ThemeContext';

const WELCOME_MESSAGE = {
  id:        'welcome',
  role:      'assistant',
  content:   "Hello! I'm **Neural PDF** — your AI document intelligence assistant.\n\nUpload a PDF using the 📎 button or the panel above, then ask me anything about it.\n\nI use **RAG (Retrieval-Augmented Generation)** to find only the most relevant sections of your document, then cite which pages my answers come from.\n\nYou can also just chat with me directly without a PDF!",
  time:      getTime(),
  citations: [],
};

function getTime() {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function genId() {
  return Math.random().toString(36).slice(2, 10);
}

export default function ChatPage() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  const [messages,         setMessages]         = useState([WELCOME_MESSAGE]);
  const [input,            setInput]            = useState('');
  const [loading,          setLoading]          = useState(false);
  const [pdfData,          setPdfData]          = useState(null);
  const [showUploader,     setShowUploader]     = useState(true);
  const [sessions,         setSessions]         = useState([]);
  const [currentSessionId, setCurrentSessionId] = useState(null);

  const bottomRef = useRef(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('neural-pdf-sessions');
      if (saved) setSessions(JSON.parse(saved));
    } catch {}
  }, []);

  useEffect(() => {
    try { localStorage.setItem('neural-pdf-sessions', JSON.stringify(sessions)); } catch {}
  }, [sessions]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleUpload = useCallback((data) => {
    setPdfData({ pdfText: data.pdfText, chunks: data.chunks, metadata: data.metadata, filename: data.filename });
    setShowUploader(false);
    setMessages((prev) => [...prev, {
      id: genId(), role: 'assistant',
      content: [
        `✅ **${data.filename}** loaded successfully!\n`,
        `**Document stats:**`,
        `- 📄 ${data.metadata.pageCount} pages`,
        `- 📝 ${(data.metadata.wordCount || 0).toLocaleString()} words`,
        `- 🧩 ${data.metadata.chunkCount} chunks indexed for RAG`,
        data.metadata.author !== 'Unknown' ? `- ✍️ Author: ${data.metadata.author}` : '',
        `\nI'm ready! Ask me anything about this document.`,
      ].filter(Boolean).join('\n'),
      time: getTime(), citations: [],
    }]);
  }, []);

  const handleSend = useCallback(async () => {
    const question = input.trim();
    if (!question || loading) return;

    const userMsg = { id: genId(), role: 'user', content: question, time: getTime() };
    const assistantId = genId();
    const placeholder = { id: assistantId, role: 'assistant', content: '', time: getTime(), citations: [], streaming: true };

    setMessages((prev) => [...prev, userMsg, placeholder]);
    setInput('');
    setLoading(true);

    try {
      const history = messages.filter(m => m.id !== 'welcome').slice(-10).map(m => ({ role: m.role, content: m.content }));
      const response = await fetch('/api/ask', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question, chunks: pdfData?.chunks || null, metadata: pdfData?.metadata || null, history }),
      });
      if (!response.ok) { const e = await response.json(); throw new Error(e.error || 'Request failed'); }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '', fullContent = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop();
        for (const line of lines) {
          if (!line.startsWith('data: ')) continue;
          const raw = line.slice(6).trim();
          if (raw === '[DONE]') continue;
          try {
            const parsed = JSON.parse(raw);
            if (parsed.type === 'citations') {
              setMessages(prev => prev.map(m => m.id === assistantId ? { ...m, citations: parsed.citations } : m));
            } else if (parsed.type === 'token') {
              fullContent += parsed.token;
              setMessages(prev => prev.map(m => m.id === assistantId ? { ...m, content: fullContent, streaming: true } : m));
            }
          } catch {}
        }
      }
      setMessages(prev => prev.map(m => m.id === assistantId ? { ...m, content: fullContent, streaming: false } : m));
// ==========================
// 🔥 SAVE FULL HISTORY SAFELY
// ==========================
setSessions(prev => {
  let updated = [...prev];

  if (!currentSessionId) {
    const newId = genId();
    setCurrentSessionId(newId);

    updated = [{
      id: newId,
      title: question.slice(0, 40) + (question.length > 40 ? '...' : ''),

      // ✅ NEW DATA (SAFE ADD)
      fileName: pdfData?.filename || "No file",
      time: getTime(),
      messages: [
        { role: 'user', content: question },
        { role: 'assistant', content: fullContent }
      ]

    }, ...prev];
  } else {
    updated = prev.map(s =>
      s.id === currentSessionId
        ? {
            ...s,
            messages: [
              ...(s.messages || []),
              { role: 'user', content: question },
              { role: 'assistant', content: fullContent }
            ]
          }
        : s
    );
  }

  return updated.slice(0, 20);
});
    } catch (err) {
      setMessages(prev => prev.map(m => m.id === assistantId ? { ...m, content: `⚠️ Error: ${err.message}`, streaming: false } : m));
    } finally {
      setLoading(false);
    }
  }, [input, loading, messages, pdfData, currentSessionId]);

  const handleNewChat = () => { setMessages([WELCOME_MESSAGE]); setPdfData(null); setCurrentSessionId(null); setInput(''); setShowUploader(true); };
  const handleSelectSession = (id) => setCurrentSessionId(id);
  const handleClearHistory = () => { setSessions([]); try { localStorage.removeItem('neural-pdf-sessions'); } catch {} };

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', background: 'var(--bg)' }}>

      <Sidebar
        metadata={pdfData?.metadata}
        sessions={sessions}
        currentSession={currentSessionId}
        onNewChat={handleNewChat}
        onSelectSession={handleSelectSession}
        onClearAll={handleClearHistory}
      />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

        {/* ── Header ─────────────────────────────────────── */}
        <header style={{
          padding: '14px 20px', borderBottom: '1px solid var(--border)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          background: 'var(--header-bg)', flexShrink: 0, gap: 12,
        }}>
          <div>
            <div style={{
              fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 17,
              background: 'linear-gradient(135deg, var(--text), var(--accent2))',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>
              {pdfData ? `📄 ${pdfData.filename}` : '⚡ Neural PDF'}
            </div>
            <div style={{ fontSize: 11, color: 'var(--text3)', fontFamily: 'var(--font-mono)', marginTop: 2 }}>
              {pdfData ? `RAG · ${pdfData.metadata.pageCount} pages · ${pdfData.metadata.chunkCount} chunks` : 'AI · Document Intelligence · LLaMA 3.3 70B'}
            </div>
          </div>

          {/* Right controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {/* Back to Home */}
            <Link href="/home" style={{
              textDecoration: 'none', padding: '6px 12px', borderRadius: '8px',
              background: 'var(--surface2)', border: '1px solid var(--border)',
              fontSize: 12, color: 'var(--text2)', fontFamily: 'var(--font-mono)',
              transition: 'all 0.2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.color = 'var(--text)'; e.currentTarget.style.borderColor = 'var(--border2)'; }}
              onMouseLeave={e => { e.currentTarget.style.color = 'var(--text2)'; e.currentTarget.style.borderColor = 'var(--border)'; }}
            >
              ← Home
            </Link>

            {/* Model badge */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 6, padding: '6px 12px',
              background: 'var(--surface2)', border: '1px solid var(--border)',
              borderRadius: 20, fontSize: 11, color: 'var(--accent2)', fontFamily: 'var(--font-mono)',
            }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--success)', display: 'inline-block', animation: 'pulse-glow 2s infinite' }} />
              Groq · LLaMA 70B
            </div>

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              style={{
                display: 'flex', alignItems: 'center', gap: 6,
                padding: '6px 12px', borderRadius: '8px',
                border: '1px solid var(--border)', background: 'var(--surface2)',
                color: 'var(--text2)', fontFamily: 'var(--font-display)',
                fontSize: 13, cursor: 'pointer',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'var(--surface3)'; e.currentTarget.style.color = 'var(--text)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'var(--surface2)'; e.currentTarget.style.color = 'var(--text2)'; }}
            >
              {isDark ? '☀️' : '🌙'}
            </button>
          </div>
        </header>

        {/* ── PDF Uploader ────────────────────────────────── */}
        {showUploader && <PDFUploader onUpload={handleUpload} currentFile={pdfData?.filename} />}

        {pdfData && (
          <button
            onClick={() => setShowUploader(v => !v)}
            style={{
              background: 'none', border: 'none', borderBottom: '1px solid var(--border)',
              color: 'var(--text3)', fontFamily: 'var(--font-mono)', fontSize: 11,
              padding: '6px 16px', cursor: 'pointer', textAlign: 'left',
              width: '100%', flexShrink: 0,
            }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--accent2)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--text3)'}
          >
            {showUploader ? '▲ Hide uploader' : '▼ Replace PDF'}
          </button>
        )}

        {/* ── Messages ────────────────────────────────────── */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
          {messages.map(message => <ChatMessage key={message.id} message={message} />)}
          {loading && messages[messages.length - 1]?.content === '' && (
            <div style={{ display: 'flex', gap: 6, padding: '12px 0 0 4px', alignItems: 'center' }}>
              {[0, 1, 2].map(i => (
                <div key={i} style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--accent)', animation: `blink 1.2s ${i * 0.2}s ease-in-out infinite` }} />
              ))}
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* ── Input ───────────────────────────────────────── */}
        <ChatInput value={input} onChange={setInput} onSend={handleSend} onAttach={() => setShowUploader(v => !v)} disabled={loading} hasDoc={!!pdfData} />
      </div>
    </div>
  );
}