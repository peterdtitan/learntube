'use client';

import React from 'react';

// Replaces the whole layout when the layout itself fails, so it can't rely on
// the app's styles or components; plain inline styles only.
export default function GlobalError({ error, reset }) {
  return (
    <html lang="en">
      <body style={{
        margin: 0, minHeight: '100vh', display: 'grid', placeItems: 'center', fontFamily: 'system-ui, sans-serif', background: '#F3F5F7', color: '#17212B', padding: 24,
      }}
      >
        <main style={{ maxWidth: 480 }}>
          <h1 style={{ fontSize: 28, margin: '0 0 12px' }}>LearnTube couldn’t load.</h1>
          <p style={{ color: '#55616C', fontSize: 17, lineHeight: 1.5 }}>
            Something went wrong on our side. Your progress is saved.
          </p>
          <button
            type="button"
            onClick={reset}
            style={{
              marginTop: 8, padding: '10px 20px', borderRadius: 999, border: 0, background: '#2F6F62', color: '#fff', fontWeight: 700, fontSize: 15, cursor: 'pointer',
            }}
          >
            Try again
          </button>
          {error?.digest && <p style={{ color: '#55616C', fontSize: 12, marginTop: 16 }}>{`Reference: ${error.digest}`}</p>}
        </main>
      </body>
    </html>
  );
}
