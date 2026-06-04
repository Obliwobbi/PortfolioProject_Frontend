import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { apiGet } from "../../api/apiClient";
import "./CompaniesPage.css";

function CompaniesPage() {
  const [companies, setCompanies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    async function fetchCompanies() {
      try {
        const data = await apiGet("/companies");
        setCompanies(data);
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchCompanies();
  }, []);

  if (isLoading) {
    return <p className="companies-status">Loading companies...</p>;
  }

  if (errorMessage) {
    return <p className="companies-error">{errorMessage}</p>;
  }

  return (
    <section className="companies-page">
      <div className="companies-page__header">
        <div>
          <p className="companies-page__eyebrow">Company management</p>
          <h1>Companies</h1>
          <p className="companies-page__description">
            View companies based on your access level.
          </p>
        </div>

        <div className="companies-page__summary">
          <strong>{companies.length}</strong>
          <span>{companies.length === 1 ? "company" : "companies"}</span>
        </div>
      </div>

      <div className="companies-list">
        {companies.map((company) => (
          <article className="company-card" key={company.id}>
            <div>
              <h2>{company.name}</h2>
              <p>Company ID: {company.id}</p>
            </div>

            <button
              type="button"
              onClick={() =>
                navigate(`/companies/${company.id}`, {
                  state: {
                    from: `${location.pathname}${location.search}`,
                  },
                })
              }
            >
              Details
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}

export default CompaniesPage;
