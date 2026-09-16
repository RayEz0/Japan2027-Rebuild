import { createContext, useContext, useState, useEffect } from 'react'
import { useAuth } from './AuthContext'

const ROLE_KEY = 'jp27_role'

const RoleCtx = createContext({
  role: 'admin',
  isAdmin: true,
  isUser: true,
  setRole: () => {},
})

export function RoleProvider({ children }) {
  const { user } = useAuth()

  const [role, setRoleState] = useState(() => {
    return localStorage.getItem(ROLE_KEY) || 'admin'
  })

  // When Supabase user logs in, read role from user metadata
  // Future: also check a user_roles table via RLS
  useEffect(() => {
    const serverRole = user?.user_metadata?.role
    if (serverRole && serverRole !== role) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setRoleState(serverRole)
      try { localStorage.setItem(ROLE_KEY, serverRole) } catch { /* intentional */ }
    }
  }, [user?.id]) // eslint-disable-line react-hooks/exhaustive-deps

  const setRole = (r) => {
    setRoleState(r)
    try { localStorage.setItem(ROLE_KEY, r) } catch { /* intentional */ }
  }

  return (
    <RoleCtx.Provider value={{
      role,
      isAdmin: role === 'admin',
      isUser: true, // admin has all user capabilities
      setRole,
    }}>
      {children}
    </RoleCtx.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useRole() {
  return useContext(RoleCtx)
}
