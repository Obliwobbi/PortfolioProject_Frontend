import "./UserMenu.css";

function UserMenu({ user, onLogout }) {
  const initials = `${user.firstname?.charAt(0)}${user.lastname?.charAt(0)}`;

  function formatRole(role) {
    if (role === "SYSTEM_ADMIN") return "System admin";
    if (role === "COMPANY_ADMIN") return "Company admin";
    if (role === "MEMBER") return "Member";
    return role;
  }

  return (
    <div className="user-menu">
      <div className="user-menu__avatar">{initials}</div>

      <div className="user-menu__info">
        <strong>
          {user.firstname} {user.lastname}
        </strong>

        <span>{formatRole(user.role)}</span>
      </div>

      <button onClick={onLogout}>Logout</button>
    </div>
  );
}

export default UserMenu;
