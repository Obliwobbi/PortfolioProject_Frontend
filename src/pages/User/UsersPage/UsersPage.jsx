import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router";
import { apiGet } from "../../../api/apiClient";
import UserCard from "../../../components/UserCard/UserCard";
import "./UsersPage.css";

function UsersPage() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const [searchParams, setSearchParams] = useSearchParams();

  const searchTerm = searchParams.get("search") ?? "";
  const selectedRole = searchParams.get("role") ?? "ALL";
  const selectedCompany = searchParams.get("company") ?? "ALL";
  // const [searchTerm, setSearchTerm] = useState("");
  // const [selectedRole, setSelectedRole] = useState("ALL");
  // const [selectedCompany, setSelectedCompany] = useState("ALL");

  useEffect(() => {
    async function fetchUsers() {
      try {
        const data = await apiGet("/users");
        setUsers(data);
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchUsers();
  }, []);

  const companies = useMemo(() => {
    const uniqueCompanies = new Map();

    users.forEach((user) => {
      if (user.companyId && user.companyName) {
        uniqueCompanies.set(user.companyId, user.companyName);
      }
    });

    return Array.from(uniqueCompanies, ([id, name]) => ({ id, name }));
  }, [users]);

  const filteredUsers = users.filter((user) => {
    const searchText =
      `${user.firstname} ${user.lastname} ${user.email} ${user.companyName}`.toLowerCase();

    const matchesSearch = searchText.includes(searchTerm.toLowerCase());

    const matchesRole = selectedRole === "ALL" || user.role === selectedRole;

    const matchesCompany =
      selectedCompany === "ALL" || String(user.companyId) === selectedCompany;

    return matchesSearch && matchesRole && matchesCompany;
  });

  if (isLoading) {
    return <p className="users-status">Loading users...</p>;
  }

  if (errorMessage) {
    return <p className="users-error">{errorMessage}</p>;
  }

  function updateSearchParam(key, value) {
  const nextParams = new URLSearchParams(searchParams);

  if (!value || value === "ALL") {
    nextParams.delete(key);
  } else {
    nextParams.set(key, value);
  }

  setSearchParams(nextParams);
}

  return (
    <section className="users-page">
      <div className="users-page__header">
        <div>
          <p className="users-page__eyebrow">User management</p>
          <h1>Users</h1>
          <p className="users-page__description">
            Search, filter and manage users connected to your access level.
          </p>
        </div>

        <div className="users-page__summary">
          <strong>{filteredUsers.length}</strong>
          <span>shown of {users.length}</span>
        </div>
      </div>

      <div className="users-toolbar">
        <input
          type="search"
          placeholder="Search by name, email or company..."
          value={searchTerm}
          onChange={(event) => updateSearchParam("search", event.target.value)}
        />

        <select
          value={selectedRole}
          onChange={(event) => updateSearchParam("role", event.target.value)}
        >
          <option value="ALL">All roles</option>
          <option value="SYSTEM_ADMIN">System admin</option>
          <option value="COMPANY_ADMIN">Company admin</option>
          <option value="MEMBER">Member</option>
        </select>

        <select
          value={selectedCompany}
          onChange={(event) => updateSearchParam("company", event.target.value)}
        >
          <option value="ALL">All companies</option>
          {companies.map((company) => (
            <option key={company.id} value={company.id}>
              {company.name}
            </option>
          ))}
        </select>
      </div>

      {filteredUsers.length === 0 ? (
        <div className="users-empty">
          <h2>No users found</h2>
          <p>Try changing your search or filters.</p>
        </div>
      ) : (
        <div className="users-list">
          {filteredUsers.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      )}
    </section>
  );
}

export default UsersPage;
