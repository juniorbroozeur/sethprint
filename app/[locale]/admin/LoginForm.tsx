'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { box, input, label, primaryBtn, page } from './styles';

export default function LoginForm() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });
    setLoading(false);
    if (res.ok) router.refresh();
    else setError((await res.json().catch(() => null))?.error ?? 'Erreur de connexion');
  }

  return (
    <div style={{ ...page, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <form onSubmit={onSubmit} style={{ ...box, width: '100%', maxWidth: 380 }}>
        <h1 style={{ fontFamily: 'var(--font-h)', fontStyle: 'italic', fontSize: 28, color: '#fff', marginBottom: 24 }}>
          Administration
        </h1>
        <label style={label} htmlFor="pw">Mot de passe</label>
        <input
          id="pw"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          style={input}
          required
        />
        {error && <p style={{ color: '#ff6b6b', fontSize: 13, marginTop: 12 }}>{error}</p>}
        <button type="submit" disabled={loading} style={{ ...primaryBtn, width: '100%', marginTop: 20 }}>
          {loading ? 'Connexion…' : 'Se connecter'}
        </button>
      </form>
    </div>
  );
}
