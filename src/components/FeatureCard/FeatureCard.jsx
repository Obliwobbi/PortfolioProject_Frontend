import './FeatureCard.css'

function FeatureCard({ icon, title, text}) {
    return (
        <article className="feature-card">
            <div className="feature-card__icon">
                {icon}
            </div>
            <h2 className="feature-card__title">
                {title}
            </h2>
            <p className="feature-card__text">
                {text}
            </p>
        </article>
    )
}

export default FeatureCard