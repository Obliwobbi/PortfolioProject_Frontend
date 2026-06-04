import './FeaturesPage.css'

const features = [
  {
    title: 'User Management',
    text: 'Create, view and manage users through a protected backend API.',
    icon: '👥',
  },
  {
    title: 'Company Structure',
    text: 'Users are connected to companies, making the system ready for company-based access.',
    icon: '🏢',
  },
  {
    title: 'Role Based Access',
    text: 'Different roles can see different data, such as system admins, company admins and members.',
    icon: '🔐',
  },
  {
    title: 'JWT Authentication',
    text: 'Login returns a JWT token which is used to access protected endpoints.',
    icon: '🪪',
  },
  {
    title: 'REST API',
    text: 'The frontend communicates with the Java/Javalin backend through REST endpoints.',
    icon: '🌐',
  },
  {
    title: 'Deployment Ready',
    text: 'The application is deployed using Docker, GitHub Actions, Watchtower and Caddy.',
    icon: '🚀',
  },
]

function FeaturesPage() {
  return (
    <section className="features-page">
      <div className="features-page__hero">
        <p className="features-page__eyebrow">Features</p>
        <h1>Built for simple member management</h1>
        <p>
          MemberSystem is a backend-driven application focused on users,
          companies, authentication and role-based access.
        </p>
      </div>

      <div className="features-page__grid">
        {features.map((feature) => (
          <article className="feature-card" key={feature.title}>
            <div className="feature-card__icon">{feature.icon}</div>
            <h2>{feature.title}</h2>
            <p>{feature.text}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

export default FeaturesPage