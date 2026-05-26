import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { apiGet, apiPost } from "../../api/apiClient";
import "./RegisterPage.css";

function RegisterPage() {
  const navigate = useNavigate();

  const [companies, setCompanies] = useState([]);
  const [isLoadingCompanies, setIsLoadingCompanies] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [formData, setFormData] = useState({
    companyId: "",
    email: "",
    firstname: "",
    lastname: "",
    dob: "",
    password: "",
  });

  useEffect(() => {
    async function fetchCompanies() {
      try {
        const data = await apiGet("/companies", false);
        setCompanies(data);
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setIsLoadingCompanies(false);
      }
    }

    fetchCompanies();
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((currentFormData) => ({
      ...currentFormData,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setErrorMessage("");
    setIsSubmitting(true);

    try {
      await apiPost(
        "/register",
        {
          companyId: Number(formData.companyId),
          email: formData.email,
          firstname: formData.firstname,
          lastname: formData.lastname,
          dob: formData.dob,
          role: "MEMBER",
          password: formData.password,
        },
        false,
      );

      navigate("/login");
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="register-page">
      <form className="register-card" onSubmit={handleSubmit}>
        <div className="register-card__header">
          <h1>Create account</h1>
          <p>Choose a company and create your MemberSystem user.</p>
        </div>

        {errorMessage && <div className="register-error">{errorMessage}</div>}

        <label>
          Company
          <select
            name="companyId"
            value={formData.companyId}
            onChange={handleChange}
            required
            disabled={isLoadingCompanies}
          >
            <option value="">
              {isLoadingCompanies ? "Loading companies..." : "Select company"}
            </option>

            {companies.map((company) => (
              <option key={company.id} value={company.id}>
                {company.name}
              </option>
            ))}
          </select>
        </label>

        <div className="register-card__row">
          <label>
            Firstname
            <input
              name="firstname"
              type="text"
              value={formData.firstname}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Lastname
            <input
              name="lastname"
              type="text"
              value={formData.lastname}
              onChange={handleChange}
              required
            />
          </label>
        </div>

        <label>
          Email
          <input
            name="email"
            type="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Date of birth
          <input
            name="dob"
            type="date"
            value={formData.dob}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Password
          <input
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </label>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Creating account..." : "Create account"}
        </button>

        <div className="register-card__footer">
          <span>Already have an account?</span>
          <NavLink to="/login">Login</NavLink>
        </div>
      </form>
    </section>
  );
}

export default RegisterPage;
