import "./WelcomeLogoHero.css";

export const WelcomeLogoHero = () => {
  return (
    <section className="welcome-container">
      <p className="small-title">WELCOME TO</p>
      <h1>
        Pick <span className="second-word">A</span>Park
      </h1>
      <img src="/images/pick-logo-5.svg" alt="Pick A Park logo" className="login-logo" />
    </section>
  );
};
