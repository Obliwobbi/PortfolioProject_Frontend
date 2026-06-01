import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router'
import { apiPost, apiGet } from '../../api/apiClient'

import './LoginPage.css'

function LoginPage() {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()

    setErrorMessage('')
    setIsLoading(true)

    try {
      const data = await apiPost('/login', {
        email,
        password,
      }, false)

      localStorage.setItem('token', data.token)
      const currentUser = await apiGet('/me')

      if (currentUser.role === 'MEMBER') {
      navigate(`/users/${currentUser.id}`)
      } else {
        navigate('/users')
      }
    } catch (error) {
      setErrorMessage(error.message || 'Invalid email or password')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="login-page">
      <form className="login-card" onSubmit={handleSubmit}>
        <h1>Login</h1>
        <p>Sign in to access MemberSystem.</p>

        {errorMessage && (
          <div className="login-error">{errorMessage}</div>
        )}

        <label>
          Email
          <input
            type="email"
            placeholder="admin@obli.dk"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </label>

        <label>
          Password
          <input
            type="password"
            placeholder="Your password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>

        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
        <div className="login-card__footer">
          <span>Don't have an account?</span>
          <NavLink to="/register">Create account</NavLink>
        </div>
      </form>
    </section>
  )
}

export default LoginPage