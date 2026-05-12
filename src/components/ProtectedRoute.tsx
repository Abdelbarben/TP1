import { Navigate } from 'react-router-dom'
import { useAuth } from '../features/auth/AuthContext'

export default function ProtectedRoute({ children }: any) {
  const { state } = useAuth()

  if (!state.user) {
    return <Navigate to="/login" replace />
  }

  return children
}