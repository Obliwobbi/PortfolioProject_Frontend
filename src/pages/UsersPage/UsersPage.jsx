import { useEffect, useState } from 'react'
import './UsersPage.css'

function UsersPage() {
  const [users, setUsers] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    async function fetchUsers() {
      try {
        const token = localStorage.getItem('token')

        const response = await fetch('https://membersystem.obli.dk/api/v1/users', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        if (!response.ok) {
          throw new Error('Could not fetch users')
        }

        const data = await response.json()
        setUsers(data)
      } catch (error) {
        setErrorMessage(error.message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchUsers()
  }, [])

  if (isLoading) {
    return <p className="users-status">Loading users...</p>
  }

  if (errorMessage) {
    return <p className="users-error">{errorMessage}</p>
  }

  return (
    <section className="users-page">
      <div className="users-page__header">
        <div>
          <p className="users-page__eyebrow">Protected page</p>
          <h1>Users</h1>
        </div>

        <p className="users-page__count">{users.length} users</p>
      </div>

      <div className="users-grid">
        {users.map((user) => (
          <article className="user-card" key={user.id}>
            <div className="user-card__avatar">
              {user.firstname?.charAt(0)}
              {user.lastname?.charAt(0)}
            </div>

            <div>
              <h2>
                {user.firstname} {user.lastname}
              </h2>
              <p>{user.email}</p>
              <span>{user.role}</span>
            </div>

            <div className="user-card__company">
              <p>Company</p>
              <strong>{user.companyName}</strong>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default UsersPage