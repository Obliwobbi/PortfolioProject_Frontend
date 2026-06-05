import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import { apiGet, apiDelete } from "../../../api/apiClient";
import RoleBadge from "../../../components/RoleBadge/RoleBadge";
import "./UserDetailsPage.css";

function formatDob(dob) {
  if (!dob) return "Unknown";

  const [year, month, day] = dob;

  return `År: ${year} Måned: ${String(month).padStart(2, "0")} Dato: ${String(day).padStart(2, "0")}`;
}

function UserDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const loggedInUser = await apiGet("/me");
        const selectedUser = await apiGet(`/users/${id}`);

        setCurrentUser(loggedInUser);
        setUser(selectedUser);
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [id]);

  async function handleDeleteUser() {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${user.firstname} ${user.lastname}?`,
    );

    if (!confirmed) {
      return;
    }

    try {
      await apiDelete(`/users/${user.id}`);
      navigate("/users");
    } catch (error) {
      setErrorMessage(error.message);
    }
  }

  if (isLoading) {
    return <p className="user-details-status">Loading user...</p>;
  }

  if (errorMessage) {
    return <p className="user-details-error">{errorMessage}</p>;
  }

  if (!user) {
    return <p className="user-details-error">User not found</p>;
  }

  const initials = `${user.firstname?.charAt(0) ?? ""}${user.lastname?.charAt(0) ?? ""}`;

  const canGoBackToUsers =
    currentUser?.role === "SYSTEM_ADMIN" ||
    currentUser?.role === "COMPANY_ADMIN";

  const backTo = location.state?.from || "/users";

  const canDeleteUser =
    currentUser?.role === "SYSTEM_ADMIN" ||
    currentUser?.role === "COMPANY_ADMIN";

  return (
    <section className="user-details-page">
      {canGoBackToUsers && (
        <button
          className="user-details-back"
          onClick={() => navigate(backTo)}
          type="button"
        >
          ← Back to users
        </button>
      )}

      <article className="user-details-card">
        <div className="user-details-card__top">
          <div className="user-details-avatar">{initials}</div>

          <div>
            <h1>
              {user.firstname} {user.lastname}
            </h1>
            <p>{user.email}</p>
            <RoleBadge role={user.role} />
          </div>
        </div>

        <div className="user-details-grid">
          <fieldset className="user-details-field">
            <legend>Firstname</legend>
            <strong>{user.firstname}</strong>
          </fieldset>

          <fieldset className="user-details-field">
            <legend>Lastname</legend>
            <strong>{user.lastname}</strong>
          </fieldset>

          <fieldset className="user-details-field">
            <legend>Date of birth</legend>
            <strong>{formatDob(user.dob)}</strong>
          </fieldset>

          <fieldset className="user-details-field">
            <legend>Company</legend>
            <strong>{user.companyName}</strong>
          </fieldset>

          <fieldset className="user-details-field">
            <legend>Company ID</legend>
            <strong>{user.companyId}</strong>
          </fieldset>

          <fieldset className="user-details-field">
            <legend>User ID</legend>
            <strong>{user.id}</strong>
          </fieldset>
        </div>
        <div className="user-details-actions">
          <button
            type="button"
            onClick={() => navigate(`/users/${user.id}/edit`)}
          >
            Edit user
          </button>

          {canDeleteUser && (
            <button
              type="button"
              className="user-details-danger"
              onClick={handleDeleteUser}
            >
              Delete user
            </button>
          )}
        </div>
      </article>
    </section>
  );
}

export default UserDetailsPage;
