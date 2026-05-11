import FeatureCard from '../../components/FeatureCard/FeatureCard'

function FrontPage() {
  return (
    <>
      <h1>MemberSystem</h1>

      <div className="features-grid">
        <FeatureCard
          icon="👥"
          title="User Management"
          text="Create and manage users through your API."
        />

        <FeatureCard
          icon="🏢"
          title="Companies"
          text="Organize members into companies."
        />

      </div>
    </>
  )
}

export default FrontPage