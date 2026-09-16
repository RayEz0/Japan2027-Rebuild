import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const INP = {
  border: 'none', borderBottom: '1px solid var(--border)',
  background: 'none', fontFamily: 'Outfit, sans-serif',
  fontSize: 14, color: 'var(--ink)', padding: '6px 0',
  outline: 'none', width: '100%',
}

const LABEL = {
  fontFamily: '"JetBrains Mono", monospace', fontSize: 7.5,
  color: 'var(--ink3)', letterSpacing: '1px',
  textTransform: 'uppercase', display: 'block', marginBottom: 6,
}

export default function Login() {
  const { signIn, signUp, signOut, user, hasSupabase } = useAuth()
  const navigate = useNavigate()
  const [mode,    setMode]    = useState('sign_in')
  const [email,   setEmail]   = useState('')
  const [pass,    setPass]    = useState('')
  const [error,   setError]   = useState('')
  const [loading, setLoading] = useState(false)
  const [msg,     setMsg]     = useState('')

  if (user) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
        <div style={{ width: 380, padding: '32px', border: '1.5px solid var(--ink)', background: 'var(--surf)' }}>
          <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 8, color: 'var(--ink3)', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: 4 }}>
            Cloud Sync Active
          </div>
          <div style={{ fontFamily: 'Fraunces, serif', fontSize: 22, fontWeight: 600, color: 'var(--ink)', marginBottom: 4 }}>Signed In</div>
          <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 9, color: 'var(--ink3)', letterSpacing: '0.5px', marginBottom: 28 }}>
            {user.email}
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <button
              onClick={() => navigate('/')}
              style={{ flex: 1, background: 'var(--ink)', color: 'var(--surf)', border: 'none', padding: '10px 0', fontFamily: 'Outfit, sans-serif', fontSize: 13, cursor: 'pointer' }}
            >Dashboard</button>
            <button
              onClick={() => signOut()}
              style={{ flex: 1, background: 'none', color: 'var(--ink)', border: '1px solid var(--border)', padding: '10px 0', fontFamily: 'Outfit, sans-serif', fontSize: 13, cursor: 'pointer' }}
            >Sign Out</button>
          </div>
        </div>
      </div>
    )
  }

  if (!hasSupabase) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
        <div style={{ width: 480, padding: '36px 40px', border: '1.5px solid var(--border)', background: 'var(--surf)', textAlign: 'center' }}>
          <div style={{ fontFamily: 'Fraunces, serif', fontSize: 26, fontWeight: 600, color: 'var(--ink)', marginBottom: 12 }}>Cloud Sync Inactive</div>
          <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 9.5, color: 'var(--ink3)', lineHeight: 1.8, letterSpacing: '0.3px', marginBottom: 24 }}>
            Add your Supabase keys to <span style={{ color: 'var(--ink)' }}>.env.local</span> and run
            the SQL in <span style={{ color: 'var(--ink)' }}>supabase/schema.sql</span> to enable cross-device sync.
            All data is already saved in localStorage — nothing is lost.
          </div>
          <button
            onClick={() => navigate('/')}
            style={{ background: 'var(--ink)', color: 'var(--surf)', border: 'none', padding: '10px 24px', fontFamily: 'Outfit, sans-serif', fontSize: 13, cursor: 'pointer' }}
          >Back to Dashboard</button>
        </div>
      </div>
    )
  }

  const submit = async (e) => {
    e.preventDefault()
    setError(''); setLoading(true)
    const fn = mode === 'sign_in' ? signIn : signUp
    const { error: err } = await fn(email, pass)
    setLoading(false)
    if (err) { setError(err.message); return }
    if (mode === 'sign_up') {
      setMsg('Account created. Check your email to confirm, then sign in.')
    } else {
      navigate('/')
    }
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
      <div style={{ width: 380, padding: '36px 32px', border: '1.5px solid var(--ink)', background: 'var(--surf)' }}>
        <div style={{ fontFamily: 'Fraunces, serif', fontSize: 24, fontWeight: 600, color: 'var(--ink)', marginBottom: 4 }}>World Tour</div>
        <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 8.5, color: 'var(--ink3)', letterSpacing: '1.2px', textTransform: 'uppercase', marginBottom: 28 }}>
          {mode === 'sign_in' ? 'Sign in · Cloud Sync' : 'Create Account'}
        </div>

        {msg ? (
          <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 10, color: 'var(--ink2)', lineHeight: 1.7, padding: '12px 0', borderLeft: '3px solid var(--border)', paddingLeft: 12 }}>
            {msg}
          </div>
        ) : (
          <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <div>
              <label style={LABEL}>Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} required style={INP} />
            </div>
            <div>
              <label style={LABEL}>Password</label>
              <input type="password" value={pass} onChange={e => setPass(e.target.value)} required style={INP} />
            </div>
            {error && (
              <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 9, color: 'var(--accent)', lineHeight: 1.6 }}>{error}</div>
            )}
            <button
              type="submit" disabled={loading}
              style={{
                background: 'var(--ink)', color: 'var(--surf)', border: 'none',
                padding: '10px 0', fontFamily: 'Outfit, sans-serif', fontSize: 13,
                fontWeight: 500, cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.6 : 1, marginTop: 4,
              }}
            >{loading ? 'Please wait…' : mode === 'sign_in' ? 'Sign In' : 'Create Account'}</button>
          </form>
        )}

        <div style={{ marginTop: 20, borderTop: '1px solid var(--border)', paddingTop: 16, textAlign: 'center' }}>
          <button
            onClick={() => { setMode(m => m === 'sign_in' ? 'sign_up' : 'sign_in'); setError(''); setMsg('') }}
            style={{ background: 'none', border: 'none', fontFamily: '"JetBrains Mono", monospace', fontSize: 9, color: 'var(--ink3)', cursor: 'pointer', letterSpacing: '0.5px' }}
          >
            {mode === 'sign_in' ? 'No account? Sign up' : 'Have an account? Sign in'}
          </button>
        </div>
      </div>
    </div>
  )
}
