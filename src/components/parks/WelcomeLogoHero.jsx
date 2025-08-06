import "./WelcomeLogoHero.css";

export const WelcomeLogoHero = () => {
  return (
    <section className="welcome-container">
      <div className="dual-logo-block">
        <img
          src="/images/park-feature-hero.svg"
          alt="Pick A Park logo"
          loading="lazy"
          className="login-logo"
        />
      </div>
    </section>
  );
};
