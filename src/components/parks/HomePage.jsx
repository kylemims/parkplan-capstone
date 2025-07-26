import { useNavigate } from "react-router-dom";
import { HomeHero } from "./HomeHero.jsx";
import { WelcomeLogoHero } from "./WelcomeLogoHero.jsx";
import "./HomePage.css";

export const HomePage = () => {
  const navigate = useNavigate();

  return (
    <main className="homepage">
      <HomeHero />
      <div className="homepage-overlay">
        <WelcomeLogoHero />

        <div className="hero-action-section">
          <div className="hero-tagline">
            <p>Plan your perfect park adventure</p>
          </div>

          <div className="primary-action">
            <button className="find-park-btn" onClick={() => navigate("/preferences")}>
              Find My Park
            </button>
          </div>
        </div>

        <div className="features-preview">
          <div className="feature-item">
            <div className="feature-icon">🗺️</div>
            <span>Discover</span>
          </div>
          <div className="feature-item">
            <div className="feature-icon">📋</div>
            <span>Plan</span>
          </div>
          <div className="feature-item">
            <div className="feature-icon">🎒</div>
            <span>Adventure</span>
          </div>
        </div>
      </div>
    </main>
  );
};
