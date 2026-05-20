import { NavLink, useNavigate, useLocation } from "react-router"
import { useEffect, useState } from "react"
import { apiGet } from "../../api/apiClient"
import UserMenu from "../UserMenu/UserMenu"
import "./Header.css"

const menuItems = [
  { label: "Home", to: "/" },
  { label: "Features", to: "/features" },
  { label: "How it works", to: "/how-it-works" },
];

function Header() {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()
  const location = useLocation()

  function handleLogout() {
    localStorage.removeItem("token")
    setUser(null)
    navigate("/login")
  }

  useEffect(() => {
    async function fetchCurrentUser() {
      const token = localStorage.getItem("token")

      if (!token) {
        setUser(null)
        return
      }

      try {
        const data = await apiGet("/me")
        setUser(data)
      } catch {
        setUser(null)
      }
    }

    fetchCurrentUser()
  }, [location.pathname])

  return (
    <header className="top-menu">
      <div className="top-menu__logo">
        <NavLink className="top-menu__logo-icon" to="/">
          M
        </NavLink>
        <span>MemberSystem</span>
      </div>

      <nav className="top-menu__nav">
        <ul className="top-menu__list">
          {menuItems.map((item) => (
            <li className="top-menu__item" key={item.to}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `top-menu__link${isActive ? " top-menu__link--active" : ""}`
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      {user ? (
        <UserMenu user={user} onLogout={handleLogout} />
      ) : (
        <NavLink className="top-menu__login-button" to="/login">
          Login
        </NavLink>
      )}
    </header>
  )
}

export default Header