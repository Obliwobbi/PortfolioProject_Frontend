import { useState } from 'react'
import { useNavigate } from 'react-router'
import './LoginPage.css'

function LoginPage() {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  async function handleSubmit(event) {
    event.preventDefault()

    setErrorMessage('')

    const response = await fetch('https://membersystem.obli.dk/api/v1/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })

    if (!response.ok) {
      setErrorMessage('Invalid email or password')
      return
    }

    const data = await response.json()

    localStorage.setItem('token', data.token)

    navigate('/users')
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

        <button type="submit">Login</button>
      </form>
    </section>
  )
}

export default LoginPage