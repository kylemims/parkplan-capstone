import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./NavBar.css";

export const NavBar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLinkClick = (to) => {
    setMenuOpen(false); // Close menu on any link click
    if (to === "logout") {
      localStorage.removeItem("parkplan_user");
      navigate("/", { replace: true });
    } else {
      navigate(to);
    }
  };

  return (
    <nav className="navbar">
      <div className="nav-header">
        <button className="hamburger" onClick={() => setMenuOpen((prev) => !prev)}>
          <img src="/images/hamburgerIcon.svg" alt="Menu" className="hamburger-icon" />
        </button>
      </div>

      <ul className={`nav-menu ${menuOpen ? "open" : ""}`}>
        <li>
          <button onClick={() => handleLinkClick("/")}>HOME</button>
        </li>
        <li>
          <button onClick={() => handleLinkClick("/trips")}>TRIPS</button>
        </li>
        <li>
          <button onClick={() => handleLinkClick("logout")}>LOGOUT</button>
        </li>
      </ul>
    </nav>
  );
};
