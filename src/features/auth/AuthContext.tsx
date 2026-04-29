import { createContext, useContext, useReducer } from 'react'
import type { ReactNode } from 'react'

// ✅ مهم: import types من reducer
import { authReducer, initialState } from './authReducer'
import type { AuthState, AuthAction } from './authReducer'

// ✅ type ديال context
interface AuthContextType {
  state: AuthState
  dispatch: React.Dispatch<AuthAction>
}

// ✅ create context
const AuthContext = createContext<AuthContextType | null>(null)

// ✅ Provider
export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialState)

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  )
}

// ✅ custom hook
export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider')
  }

  return context
}