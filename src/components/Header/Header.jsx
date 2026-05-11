import { NavLink } from 'react-router'
import './Header.css'

const menuItems = [
    { label: 'Home', to: '/'},
    { label: 'Features', to: '/features' },
    { label: 'How it works', to: '/how-it-works'}
]

function Header() {
    return (
        <header className="top-menu">
            <div className="top-menu__logo">
                <NavLink className="top-menu__logo-icon" to='/'>M</NavLink>
                <span>MemberSystem</span>
            </div>

            <nav className="top-menu__nav">
                <ul className="top-menu__list">
                    {menuItems.map((item) => (
                        <li className="top-menu__item" key={item.to}>
                            <NavLink
                                to={item.to}
                                className={({ isActive }) =>
                                    `top-menu__link${isActive ? ' top-menu__link--active' : ''
                                    }`
                                }
                            >
                                {item.label}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>
            <NavLink className='top-menu__login-button' to='/login'>
            Login
            </NavLink>
        </header>
    )
}

export default Header