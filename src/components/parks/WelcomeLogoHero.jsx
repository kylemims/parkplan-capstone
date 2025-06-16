import "./WelcomeLogoHero.css";

export const WelcomeLogoHero = () => {
  return (
    <section className="welcome-container">
      <div className="dual-logo-block">
        <img
          src="/images/location-logo-primary.svg"
          alt="Pick A Park logo"
          className="login-logo"
        />
        <img className="tree-logo" src="/images/main-park-logo.svg"></img>
      </div>
    </section>
  );
};
// /images/pick-logo-5.svg
