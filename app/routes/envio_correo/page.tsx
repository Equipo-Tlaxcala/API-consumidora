'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function EnvioCorreo() {
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [text, setText] = useState('');
  const [status, setStatus] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Enviando...');
    const res = await fetch('/api/email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ to, subject, text }),
    });
    const data = await res.json();
    if (data.success) {
      setStatus('Correo enviado correctamente');
    } else {
      setStatus('Error al enviar: ' + (data.error || ''));
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f4f4f4', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ background: '#fff', borderRadius: 12, boxShadow: '0 4px 24px rgba(0,0,0,0.08)', padding: 40, maxWidth: 400, width: '100%' }}>
        <h1 style={{ color: '#2d8cf0', textAlign: 'center', marginBottom: 24 }}>Enviar Correo</h1>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <input type="email" placeholder="Para" value={to} onChange={e => setTo(e.target.value)} required style={{ padding: 10, borderRadius: 6, border: '1px solid #ddd' }} />
          <input type="text" placeholder="Asunto" value={subject} onChange={e => setSubject(e.target.value)} required style={{ padding: 10, borderRadius: 6, border: '1px solid #ddd' }} />
          <textarea placeholder="Mensaje" value={text} onChange={e => setText(e.target.value)} required rows={5} style={{ padding: 10, borderRadius: 6, border: '1px solid #ddd', resize: 'vertical' }} />
          <button type="submit" style={{ background: '#2d8cf0', color: '#fff', border: 'none', borderRadius: 6, padding: '12px 0', fontWeight: 'bold', fontSize: 16, cursor: 'pointer', transition: 'background 0.2s' }}>Enviar</button>
        </form>
        <p style={{ marginTop: 16, textAlign: 'center', color: status.includes('Error') ? '#e74c3c' : '#2ecc71' }}>{status}</p>
        <button onClick={() => router.push('./menu')} style={{ marginTop: 24, background: '#eee', color: '#333', border: 'none', borderRadius: 6, padding: '10px 0', width: '100%', fontWeight: 'bold', cursor: 'pointer', transition: 'background 0.2s' }}>Regresar al menú</button>
      </div>
    </div>
  );
}
