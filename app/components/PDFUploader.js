// ============================================================
// app/components/PDFUploader.js  — Fully theme-aware
// ============================================================

'use client';

import { useState, useRef } from 'react';

export default function PDFUploader({ onUpload, currentFile }) {
  const [dragging,  setDragging]  = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error,     setError]     = useState(null);
  const [progress,  setProgress]  = useState(0);

  const fileInputRef = useRef(null);

  const handleFile = async (file) => {
    if (!file) return;
    if (!file.name.toLowerCase().endsWith('.pdf')) { setError('Please upload a PDF file.'); return; }
    if (file.size > 15 * 1024 * 1024)              { setError('File must be under 15MB.'); return; }

    setError(null); setUploading(true); setProgress(10);
    const progressTimer = setInterval(() => setProgress(p => Math.min(p + 12, 85)), 300);

    try {
      const formData = new FormData();
      formData.append('file', file);
      const res  = await fetch('/api/upload', { method: 'POST', body: formData });
      clearInterval(progressTimer);
      setProgress(100);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Upload failed');
      onUpload(data);
    } catch (err) {
      clearInterval(progressTimer);
      setError(err.message);
    } finally {
      setUploading(false);
      setTimeout(() => setProgress(0), 600);
    }
  };

  const handleDrop = (e) => { e.preventDefault(); setDragging(false); handleFile(e.dataTransfer.files[0]); };

  return (
    <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--border)' }}>
      <input ref={fileInputRef} type="file" accept=".pdf" style={{ display: 'none' }} onChange={e => handleFile(e.target.files[0])} />

      {/* Drop zone */}
      <div
        onClick={() => !uploading && fileInputRef.current?.click()}
        onDragOver={e => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        style={{
          border:       `2px dashed ${dragging ? 'var(--accent)' : 'var(--border2)'}`,
          borderRadius: 'var(--radius)',
          padding:      '20px 16px',
          textAlign:    'center',
          cursor:       uploading ? 'wait' : 'pointer',
          background:   dragging ? 'var(--accent-glow)' : 'var(--surface2)',
          transition:   'all 0.2s ease',
          position:     'relative',
          overflow:     'hidden',
        }}
      >
        {/* Progress bar */}
        {progress > 0 && (
          <div style={{
            position: 'absolute', bottom: 0, left: 0, height: '3px',
            width: `${progress}%`, background: 'var(--btn-primary-bg)',
            transition: 'width 0.3s ease', borderRadius: '0 2px 2px 0',
          }} />
        )}

        <div style={{ fontSize: 28, marginBottom: 8 }}>
          {uploading ? '⏳' : dragging ? '📥' : '📄'}
        </div>
        <div style={{
          fontSize: 13, color: dragging ? 'var(--accent2)' : 'var(--text2)',
          fontFamily: 'var(--font-display)', fontWeight: 500,
        }}>
          {uploading ? `Processing PDF... ${progress}%` : dragging ? 'Drop it here!' : 'Drop a PDF or click to upload'}
        </div>
        <div style={{ fontSize: 11, color: 'var(--text3)', marginTop: 4, fontFamily: 'var(--font-mono)' }}>
          Max 15MB · Text-based PDFs only
        </div>
      </div>

      {/* Error */}
      {error && (
        <div style={{
          marginTop: 8, fontSize: 12, color: 'var(--danger)',
          fontFamily: 'var(--font-mono)', padding: '6px 10px',
          background: 'var(--danger-bg)', borderRadius: 6, border: '1px solid var(--danger-border)',
        }}>
          ⚠ {error}
        </div>
      )}

      {/* Success badge */}
      {currentFile && !uploading && (
        <div style={{
          marginTop: 10, padding: '8px 12px',
          background: 'var(--success-bg)', border: '1px solid var(--success-border)',
          borderRadius: 8, fontSize: 12, color: 'var(--success)',
          fontFamily: 'var(--font-mono)', display: 'flex', alignItems: 'center', gap: 6,
        }}>
          <span>✓</span>
          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{currentFile}</span>
        </div>
      )}
    </div>
  );
}