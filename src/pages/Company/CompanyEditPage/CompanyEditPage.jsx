import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { apiGet, apiPut } from "../../../api/apiClient";
import "./CompanyEditPage.css";

function CompanyEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [publicRegistrationEnabled, setPublicRegistrationEnabled] =
    useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function fetchCompany() {
      try {
        const data = await apiGet(`/companies/${id}`);
        setName(data.name);
        setPublicRegistrationEnabled(data.publicRegistrationEnabled);
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchCompany();
  }, [id]);

  async function handleSubmit(event) {
    event.preventDefault();
    setErrorMessage("");
    setIsSaving(true);

    try {
      await apiPut(`/companies/${id}`, { name, publicRegistrationEnabled });
      navigate(`/companies/${id}`);
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsSaving(false);
    }
  }

  if (isLoading)
    return <p className="company-edit-status">Loading company...</p>;

  return (
    <section className="company-edit-page">
      <form className="company-edit-card" onSubmit={handleSubmit}>
        <div className="company-edit-card__header">
          <p className="company-edit-eyebrow">Edit company</p>
          <h1>Company details</h1>
          <p>Update the company name and registration status.</p>
        </div>

        {errorMessage && (
          <div className="company-edit-error">{errorMessage}</div>
        )}

        <label>
          Company name
          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />
        </label>

        <label className="company-edit-checkbox">
          <input
            type="checkbox"
            checked={publicRegistrationEnabled}
            onChange={(event) =>
              setPublicRegistrationEnabled(event.target.checked)
            }
          />

          <div>
            <strong>Allow public registration</strong>
            <span>
              When enabled, this company can be selected on the register page.
            </span>
          </div>
        </label>

        <div className="company-edit-actions">
          <button
            type="button"
            className="company-edit-secondary"
            onClick={() => navigate(`/companies/${id}`)}
          >
            Cancel
          </button>

          <button type="submit" disabled={isSaving}>
            {isSaving ? "Saving..." : "Save changes"}
          </button>
        </div>
      </form>
    </section>
  );
}

export default CompanyEditPage;
