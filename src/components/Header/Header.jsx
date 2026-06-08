import { NavLink, useNavigate, useLocation } from "react-router"
import { useEffect, useState } from "react"
import { apiGet } from "../../api/apiClient"
import UserMenu from "../UserMenu/UserMenu"
import "./Header.css"

function getMenuItems(user) {
  if (!user) {
    return [
      { label: "Home", to: "/" },
      { label: "Features", to: "/features" },
      { label: "How it works", to: "/how-it-works" },
    ]
  }

  if (user.role === "SYSTEM_ADMIN") {
    return [
      { label: "Users", to: "/users" },
      { label: "Companies", to: "/companies" },
    ]
  }

  if (user.role === "COMPANY_ADMIN") {
    return [
      { label: "My Users", to: "/users" },
      { label: "My Company", to: "/companies" },
    ]
  }

  if (user.role === "MEMBER") {
    return [
      { label: "My Profile", to: `/users/${user.id}` },
      { label: "My Company", to: "/companies" },
    ]
  }

  return []
}

function Header() {
  const [user, setUser] = useState(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navigate = useNavigate()
  const location = useLocation()

  const menuItems = getMenuItems(user)

  function handleLogout() {
    localStorage.removeItem("token")
    setUser(null)
    setIsMenuOpen(false)
    navigate("/login")
  }

  function closeMenu() {
    setIsMenuOpen(false)
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
        localStorage.removeItem("token")
        setUser(null)
      }
    }

    fetchCurrentUser()
    // setIsMenuOpen(false)
  }, [location.pathname])

  return (
    <header className="top-menu">
      <div className="top-menu__logo">
        <NavLink className="top-menu__logo-icon" to="/" onClick={closeMenu}>
          M
        </NavLink>
        <span>MemberSystem</span>
      </div>

      <button
        className={`top-menu__burger${isMenuOpen ? " top-menu__burger--open" : ""}`}
        type="button"
        aria-label="Toggle navigation menu"
        aria-expanded={isMenuOpen}
        onClick={() => setIsMenuOpen((current) => !current)}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <div className={`top-menu__mobile-panel${isMenuOpen ? " top-menu__mobile-panel--open" : ""}`}>
        <nav className="top-menu__nav">
          <ul className="top-menu__list">
            {menuItems.map((item) => (
              <li className="top-menu__item" key={item.to}>
                <NavLink
                  to={item.to}
                  onClick={closeMenu}
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

        <div className="top-menu__auth">
          {user ? (
            <UserMenu user={user} onLogout={handleLogout} />
          ) : (
            <NavLink className="top-menu__login-button" to="/login" onClick={closeMenu}>
              Login
            </NavLink>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header