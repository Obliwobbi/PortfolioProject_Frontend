import './RoleBadge.css'

function formatRole(role) {
  if (!role) return "Unknown"

  return role
    .toLowerCase()
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}

function RoleBadge({ role }) {
  return (
    <span className={`role-badge role-badge--${role?.toLowerCase()}`}>
      {formatRole(role)}
    </span>
  )
}

export default RoleBadge