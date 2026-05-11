import './Hero.css'

function Hero() {
    return (
        <section className="hero">
            <div className="hero-text">
                <p className="eyebrow">WELCOME TO MEMBERSYSTEM</p>
                <h1>Manage your members<br />
                    <span>Simple and effective</span>
                </h1>
                <p className="hero-description">
                    MemberSystem is a platform for businesses and gyms that want to manage
                    members, locations and check-ins in one place.
                </p>

                <div className="hero-actions">
                    <button>Get started</button>
                    <button className="secondary">See how it works</button>
                </div>
            </div>

            <div className="hero-preview">
                <div className="preview-icon">👥</div>
            </div>
        </section >
    )
}

export default Hero