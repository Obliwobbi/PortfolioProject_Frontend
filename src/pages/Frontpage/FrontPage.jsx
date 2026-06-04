import { NavLink } from 'react-router'
import FeatureCard from '../../components/FeatureCard/FeatureCard'
import './FrontPage.css'

function FrontPage() {
  return (
    <section className="front-page">
      <div className="front-page__hero">
        <div className="front-page__content">
          <p className="front-page__eyebrow">MemberSystem</p>

          <h1>
            Simple member management for companies and communities.
          </h1>

          <p className="front-page__description">
            A full-stack membership system built with React, Java, Javalin,
            PostgreSQL, JWT authentication and Docker deployment.
          </p>

          <div className="front-page__actions">
            <NavLink className="front-page__primary-button" to="/login">
              Login
            </NavLink>

            <NavLink className="front-page__secondary-button" to="/features">
              View features
            </NavLink>
          </div>
        </div>

        <div className="front-page__preview">
          <div className="preview-card">
            <div className="preview-card__header">
              <span className="preview-card__dot"></span>
              <span className="preview-card__dot"></span>
              <span className="preview-card__dot"></span>
            </div>

            <div className="preview-card__body">
              <div>
                <p>Total users</p>
                <strong>128</strong>
              </div>

              <div>
                <p>Companies</p>
                <strong>12</strong>
              </div>

              <div>
                <p>Access</p>
                <strong>JWT</strong>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="front-page__features">
        <FeatureCard
          icon="👥"
          title="User Management"
          text="Create, view and manage users through a protected backend API."
        />

        <FeatureCard
          icon="🏢"
          title="Companies"
          text="Organize users into companies and control access based on company roles."
        />

        <FeatureCard
          icon="🔐"
          title="Role Based Access"
          text="System admins, company admins and members only see the data they are allowed to access."
        />
      </div>
    </section>
  )
}

export default FrontPage