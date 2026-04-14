import React from 'react';
import HelloReact from './components/HelloReact';

export default function App() {
  return (
    <div style={{ fontFamily: 'sans-serif', padding: '24px' }}>
      <h2>Remote React standalone — port 3001</h2>
      <HelloReact />
    </div>
  );
}
