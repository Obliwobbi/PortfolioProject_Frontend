import './HowItWorksPage.css'

const steps = [
  {
    number: '01',
    title: 'Create account or log in',
    text: 'A user logs in with email and password. The backend validates the user and returns a JWT token.',
  },
  {
    number: '02',
    title: 'Frontend stores the token',
    text: 'The React frontend stores the token in localStorage and sends it with future API requests.',
  },
  {
    number: '03',
    title: 'Backend checks access',
    text: 'Protected endpoints verify the JWT token and use the user role to decide what data can be returned.',
  },
  {
    number: '04',
    title: 'User sees relevant data',
    text: 'System admins see all users and companies, company admins see their company data, and members see only themselves.',
  },
]

function HowItWorksPage() {
  return (
    <section className="how-page">
      <div className="how-page__hero">
        <p className="how-page__eyebrow">How it works</p>
        <h1>From login to protected data</h1>
        <p>
          MemberSystem uses a React frontend, a Java/Javalin backend, JWT
          authentication and role-based access to decide what each user can see.
        </p>
      </div>

      <div className="how-page__content">
        <div className="how-page__timeline">
          {steps.map((step) => (
            <article className="how-step" key={step.number}>
              <div className="how-step__number">{step.number}</div>

              <div>
                <h2>{step.title}</h2>
                <p>{step.text}</p>
              </div>
            </article>
          ))}
        </div>

        <aside className="how-page__panel">
          <h2>Request flow</h2>

          <div className="flow-box">
            <span>React frontend</span>
            <strong>↓</strong>
            <span>HTTP request</span>
            <strong>↓</strong>
            <span>Javalin REST API</span>
            <strong>↓</strong>
            <span>PostgreSQL database</span>
          </div>

          <p>
            The frontend never talks directly to the database. All data goes
            through the backend API.
          </p>
        </aside>
      </div>
    </section>
  )
}

export default HowItWorksPage