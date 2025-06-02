import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./NavBar.css";

export const NavBar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLinkClick = (to) => {
    setMenuOpen(false);
    if (to === "logout") {
      localStorage.removeItem("parkplan_user");
      navigate("/", { replace: true });
    } else {
      navigate(to);
    }
  };

  return (
    <nav className="navbar transparent-nav">
      <div className="nav-header">
        <button className="hamburger" onClick={() => setMenuOpen((prev) => !prev)}>
          <img src="/images/hamburger-icon-white.svg" alt="Menu" className="hamburger-icon" />
        </button>
      </div>

      <ul className={`nav-menu-drawer ${menuOpen ? "open" : ""}`}>
        <li>
          <button onClick={() => handleLinkClick("/")}>HOME</button>
        </li>
        <li>
          <button onClick={() => handleLinkClick("/trips")}>TRIPS</button>
        </li>
        <li>
          <button onClick={() => handleLinkClick("logout")}>LOGOUT</button>
        </li>
        <li className="social-icon-group mobile-icons">
          <img src="/images/IG-icon.svg" alt="Instagram" className="social-icon" />
          <img src="/images/FB-icon.svg" alt="Facebook" className="social-icon" />
          <img src="/images/YT-icon.svg" alt="YouTube" className="social-icon" />
          <img src="/images/TT-icon.svg" alt="TikTok" className="social-icon" />
        </li>
      </ul>

      {/* Desktop-only icons */}
      {/* <div className="social-icon-group desktop-icons">
        <img src="/images/IG-icon.svg" alt="Instagram" className="social-icon" />
        <img src="/images/FB-icon.svg" alt="Facebook" className="social-icon" />
        <img src="/images/YT-icon.svg" alt="YouTube" className="social-icon" />
        <img src="/images/TT-icon.svg" alt="TikTok" className="social-icon" />
      </div> */}

      {menuOpen && (
        <div className="backdrop" onClick={() => setMenuOpen(false)} aria-label="Close menu" />
      )}
    </nav>
  );
};
