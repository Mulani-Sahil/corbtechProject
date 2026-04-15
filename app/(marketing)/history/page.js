"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "neural-pdf-sessions";

export default function HistoryPage() {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) setSessions(JSON.parse(saved));
  }, []);

  return (
    <div style={{ padding: 30, maxWidth: 900, margin: "auto" }}>
      <h2>📜 Chat History</h2>

      {sessions.length === 0 && <p>No history found</p>}

      {sessions.map(session => (
        <div key={session.id} style={{
          border: "1px solid var(--border)",
          borderRadius: 12,
          padding: 15,
          marginBottom: 20
        }}>
          <h3>📄 {session.fileName}</h3>
          <p style={{ fontSize: 12 }}>{session.time}</p>

          {session.messages?.map((msg, i) => {
            if (msg.role === "user") {
              const answer = session.messages[i + 1];

              return (
                <div key={i} style={{ marginTop: 10 }}>
                  <p><b>❓ {msg.content}</b></p>
                  {answer && <p>💬 {answer.content}</p>}
                </div>
              );
            }
            return null;
          })}
        </div>
      ))}
    </div>
  );
}