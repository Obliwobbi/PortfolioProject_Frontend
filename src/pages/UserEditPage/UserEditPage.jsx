import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { apiGet, apiPut } from '../../api/apiClient'
import './UserEditPage.css'

function toDateInputValue(dob) {
  if (!dob) return ''

  if (Array.isArray(dob)) {
    const [year, month, day] = dob
    return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`
  }

  return dob
}

function UserEditPage() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [currentUser, setCurrentUser] = useState(null)
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    dob: '',
    role: 'MEMBER',
  })

  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    async function fetchData() {
      try {
        const loggedInUser = await apiGet('/me')
        const userData = await apiGet(`/users/${id}`)

        setCurrentUser(loggedInUser)

        setFormData({
          firstname: userData.firstname ?? '',
          lastname: userData.lastname ?? '',
          dob: toDateInputValue(userData.dob),
          role: userData.role ?? 'MEMBER',
        })
      } catch (error) {
        setErrorMessage(error.message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [id])

  function handleChange(event) {
    const { name, value } = event.target

    setFormData((current) => ({
      ...current,
      [name]: value,
    }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setErrorMessage('')
    setIsSaving(true)

    try {
      await apiPut(`/users/${id}`, {
        firstname: formData.firstname,
        lastname: formData.lastname,
        dob: formData.dob,
        role: formData.role,
      })

      navigate(`/users/${id}`)
    } catch (error) {
      setErrorMessage(error.message)
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) return <p className="user-edit-status">Loading user...</p>

  const canEditRole =
    currentUser?.role === 'SYSTEM_ADMIN' ||
    currentUser?.role === 'COMPANY_ADMIN'

  return (
    <section className="user-edit-page">
      <form className="user-edit-card" onSubmit={handleSubmit}>
        <div className="user-edit-card__header">
          <p className="user-edit-eyebrow">Edit user</p>
          <h1>User details</h1>
          <p>Update profile information.</p>
        </div>

        {errorMessage && (
          <div className="user-edit-error">{errorMessage}</div>
        )}

        <div className="user-edit-row">
          <label>
            Firstname
            <input
              name="firstname"
              type="text"
              value={formData.firstname}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Lastname
            <input
              name="lastname"
              type="text"
              value={formData.lastname}
              onChange={handleChange}
              required
            />
          </label>
        </div>

        <label>
          Date of birth
          <input
            name="dob"
            type="date"
            value={formData.dob}
            onChange={handleChange}
            required
          />
        </label>

        {canEditRole && (
          <label>
            Role
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
            >
              <option value="MEMBER">Member</option>
              <option value="COMPANY_ADMIN">Company Admin</option>
              <option value="SYSTEM_ADMIN">System Admin</option>
            </select>
          </label>
        )}

        <div className="user-edit-actions">
          <button
            type="button"
            className="user-edit-secondary"
            onClick={() => navigate(`/users/${id}`)}
          >
            Cancel
          </button>

          <button type="submit" disabled={isSaving}>
            {isSaving ? 'Saving...' : 'Save changes'}
          </button>
        </div>
      </form>
    </section>
  )
}

export default UserEditPage