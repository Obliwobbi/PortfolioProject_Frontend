import './UserMenu.css'

function UserMenu ({ user, onLogout}) {
    const initials = `${user.firstname?.charAt(0)}${user.lastname?.charAt(0)}`

    return (
        <div className="user-menu">
            <div className="user-menu__avatar">
                {initials}
            </div>

            <div className="user-menu__info">
                <strong>
                    {user.firstname} {user.lastname}
                </strong>

                <span>
                    {user.role}
                </span>
            </div>

            <button onClick={onLogout}>
                Logout
            </button>
        </div>
    )
}

export default UserMenu;