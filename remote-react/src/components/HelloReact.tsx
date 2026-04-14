import React, { useState } from 'react';

interface HelloReactProps {
  title?: string;
}

export default function HelloReact({ title = 'Hello from React Remote' }: HelloReactProps) {
  const [count, setCount] = useState(0);
  return (
    <div style={{
      padding: '20px',
      border: '2px solid #61dafb',
      borderRadius: '10px',
      background: '#e8f7fd',
      maxWidth: '320px',
    }}>
      <h3 style={{ margin: '0 0 12px', color: '#087ea4' }}>⚛️ {title}</h3>
      <p style={{ margin: '0 0 12px' }}>Count: <strong>{count}</strong></p>
      <button
        onClick={() => setCount(c => c + 1)}
        style={{ padding: '8px 16px', background: '#61dafb', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
      >
        + Tăng
      </button>
    </div>
  );
}
