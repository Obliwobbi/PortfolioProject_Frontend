import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import { apiGet, apiDelete } from "../../../api/apiClient";
import "./CompanyDetailsPage.css";

function CompanyDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [company, setCompany] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const loggedInUser = await apiGet("/me");
        const companyData = await apiGet(`/companies/${id}`);

        setCurrentUser(loggedInUser);
        setCompany(companyData);
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [id]);

  async function handleDeleteCompany() {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${company.name}?`,
    );

    if (!confirmed) {
      return;
    }

    try {
      await apiDelete(`/companies/${company.id}`);
      navigate("/companies");
    } catch (error) {
      setErrorMessage(error.message);
    }
  }

  if (isLoading)
    return <p className="company-details-status">Loading company...</p>;
  if (errorMessage)
    return <p className="company-details-error">{errorMessage}</p>;
  if (!company)
    return <p className="company-details-error">Company not found</p>;

  const canEditCompany =
    currentUser?.role === "SYSTEM_ADMIN" ||
    currentUser?.role === "COMPANY_ADMIN";

  const backTo = location.state?.from ?? "/companies";

  const canDeleteCompany = currentUser?.role === "SYSTEM_ADMIN";

  return (
    <section className="company-details-page">
      <button
        className="company-details-back"
        type="button"
        onClick={() => navigate(backTo)}
      >
        ← Back to companies
      </button>

      <article className="company-details-card">
        <div className="company-details-card__top">
          <div className="company-details-avatar">
            {company.name?.charAt(0)}
          </div>

          <div>
            <p className="company-details-eyebrow">Company details</p>
            <h1>{company.name}</h1>
            <p>Company ID: {company.id}</p>
          </div>
        </div>

        <div className="company-details-grid">
          <fieldset className="company-details-field">
            <legend>Company name</legend>
            <strong>{company.name}</strong>
          </fieldset>

          <fieldset className="company-details-field">
            <legend>Company ID</legend>
            <strong>{company.id}</strong>
          </fieldset>
        </div>

        {canEditCompany && (
          <div className="company-details-actions">
            <button
              type="button"
              onClick={() => navigate(`/companies/${company.id}/edit`)}
            >
              Edit company
            </button>

            {canDeleteCompany && (
              <button
                type="button"
                className="company-details-danger"
                onClick={handleDeleteCompany}
              >
                Delete company
              </button>
            )}
          </div>
        )}
      </article>
    </section>
  );
}

export default CompanyDetailsPage;
