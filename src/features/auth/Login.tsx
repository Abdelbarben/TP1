import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

import { useAuth } from './AuthContext'

export default function Login() {

  // ✅ react router
  const navigate = useNavigate()
  const location = useLocation()

  // ✅ auth context
  const { state, dispatch } = useAuth()

  // ✅ states
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  // ✅ redirect page
  const from = (location.state as any)?.from || '/dashboard'

  // ✅ redirect after login
  useEffect(() => {

    if (state.user) {
      navigate(from, { replace: true })
    }

  }, [state.user, navigate, from])

  // ✅ login function
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {

    e.preventDefault()

    dispatch({ type: 'LOGIN_START' })

    try {

      const res = await fetch(
        `http://localhost:4000/users?email=${email}`
      )

      const users = await res.json()

      // ❌ wrong email/password
      if (
        users.length === 0 ||
        users[0].password !== password
      ) {

        dispatch({
          type: 'LOGIN_FAILURE',
          payload: 'Email ou mot de passe incorrect',
        })

        return
      }

      // ✅ remove password
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

    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        background: '#f0f0f0'
      }}
    >

      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          width: '320px',
          background: 'white',
          padding: '30px',
          borderRadius: '10px'
        }}
      >

        <h2 style={{ textAlign: 'center' }}>
          TaskFlow Login
        </h2>

        {/* ✅ error */}
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

        <button
          type="submit"
          disabled={state.loading}
        >
          {state.loading
            ? 'Connexion...'
            : 'Se connecter'}
        </button>

      </form>

    </div>
  )
}