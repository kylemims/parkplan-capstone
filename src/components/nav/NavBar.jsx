import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./NavBar.css";
import { NewTripModal } from "../forms/NewTripModal.jsx";

export const NavBar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [navBackground, setNavBackground] = useState("transparent-nav");

  // Your new professional links
  const profileLinks = [
    {
      icon: "/icons/email.svg",
      label: "Email",
      href: "mailto:kylemims.dev@gmail.com",
      ariaLabel: "Send email to Kyle Mims",
    },
    {
      icon: "/icons/github.svg",
      label: "GitHub",
      href: "https://www.github.com/kylemims",
      ariaLabel: "Visit Kyle's GitHub profile",
    },
    {
      icon: "/icons/linked.svg",
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/kylemims-dev/",
      ariaLabel: "Connect with Kyle on LinkedIn",
    },
    {
      icon: "/icons/portfolio.svg",
      label: "Portfolio",
      href: "https://www.kylemims.com", // Update when deployed
      ariaLabel: "View Kyle's portfolio website",
    },
  ];

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setNavBackground("solid-nav");
    } else {
      setNavBackground("transparent-nav");
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLinkClick = (to) => {
    setMenuOpen(false);
    if (to === "logout") {
      localStorage.removeItem("parkplan_user");
      navigate("/", { replace: true });
    } else {
      navigate(to);
    }
  };

  const handleProfileLinkClick = (link) => {
    if (link.href.startsWith("mailto:")) {
      window.location.href = link.href;
    } else {
      window.open(link.href, "_blank", "noopener,noreferrer");
    }
    setMenuOpen(false);
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

        {/* Developer Section */}
        <li className="developer-section">
          <div className="developer-info">
            <h4>Kyle Mims</h4>
            <p>Full-Stack Developer</p>
          </div>
        </li>

        {/* Professional Links */}
        <li className="profile-links-section">
          <div className="profile-links-grid">
            {profileLinks.map((link, index) => (
              <button
                key={index}
                className="profile-link-btn"
                onClick={() => handleProfileLinkClick(link)}
                aria-label={link.ariaLabel}
                title={link.label}>
                <img src={link.icon} alt={link.label} className="profile-icon" />
                <span className="profile-label">{link.label}</span>
              </button>
            ))}
          </div>
        </li>
      </ul>

      {menuOpen && <div className="backdrop" onClick={() => setMenuOpen(false)} aria-label="Close menu" />}
    </nav>
  );
};
