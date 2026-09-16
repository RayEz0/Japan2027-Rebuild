import { Navigate } from 'react-router-dom'
import { useRole } from '../../context/RoleContext'

export default function AdminRoute({ children }) {
  const { isAdmin } = useRole()
  if (!isAdmin) return <Navigate to="/" replace />
  return children
}
