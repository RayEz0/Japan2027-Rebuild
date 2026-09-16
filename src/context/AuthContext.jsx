import { createContext, useContext, useEffect, useState } from 'react'
import { supabase, hasSupabase } from '../lib/supabase'

const AuthCtx = createContext({
  user: null, supabase: null, hasSupabase: false,
  signIn: () => Promise.resolve({}),
  signUp: () => Promise.resolve({}),
  signOut: () => Promise.resolve(),
})

export function AuthProvider({ children }) {
  const [user,  setUser]  = useState(null)
  const [ready, setReady] = useState(!hasSupabase)

  useEffect(() => {
    if (!hasSupabase) return

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setReady(true)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  return (
    <AuthCtx.Provider value={{
      user,
      supabase: hasSupabase ? supabase : null,
      hasSupabase,
      signIn:  (email, pass) => supabase?.auth.signInWithPassword({ email, password: pass }),
      signUp:  (email, pass) => supabase?.auth.signUp({ email, password: pass }),
      signOut: ()           => supabase?.auth.signOut(),
    }}>
      {ready ? children : (
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          height: '100vh', fontFamily: 'Outfit, sans-serif', fontSize: 13, color: '#777',
        }}>
          Connecting…
        </div>
      )}
    </AuthCtx.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  return useContext(AuthCtx)
}
