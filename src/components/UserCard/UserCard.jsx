import RoleBadge from "../RoleBadge/RoleBadge";
import "./UserCard.css";

function UserCard({ user }) {
  const initials = `${user.firstname?.charAt(0) ?? ""}${user.lastname?.charAt(0) ?? ""}`;

  return (
    <article className="user-card">
      <div className="user-card__avatar">{initials}</div>

      <div className="user-card__main">
        <h2>
          {user.firstname} {user.lastname}
        </h2>
        <p>{user.email}</p>
        <RoleBadge role={user.role} />
      </div>

      <div className="user-card__meta">
        <p>Company</p>
        <strong>{user.companyName}</strong>
      </div>

      <div className="user-card__actions">
        <button>Edit</button>
        <button className="danger">Delete</button>
      </div>
    </article>
  );
}

export default UserCard;
