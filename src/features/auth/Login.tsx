import { useState } from 'react'
import { useAuth } from './AuthContext'

export default function Login() {
  // ✅ state + dispatch typed من context
  const { state, dispatch } = useAuth()

  // ✅ types ديال inputs
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  // ✅ type ديال event
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    dispatch({ type: 'LOGIN_START' })

    try {
      const res = await fetch(`http://localhost:4000/users?email=${email}`)
      const users = await res.json()

      // ❌ user ما كاينش أو password غالط
      if (users.length === 0 || users[0].password !== password) {
        dispatch({
          type: 'LOGIN_FAILURE',
          payload: 'Email ou mot de passe incorrect',
        })
        return
      }

      // ✅ نحيد password
      const { password: _password, ...user } = users[0]

      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: user,
      })

    } catch (error) {
      dispatch({
        type: 'LOGIN_FAILURE',
        payload: 'Erreur serveur',
      })
    }
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '300px' }}>
        
        <h2>Login</h2>

        {/* ✅ error message */}
        {state.error && (
          <div style={{ color: 'red' }}>
            {state.error}
          </div>
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" disabled={state.loading}>
          {state.loading ? 'Connexion...' : 'Se connecter'}
        </button>

      </form>
    </div>
  )
}