import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getUserByEmail } from "../../services/userService";
import { HomeHero } from "../parks/HomeHero.jsx";
import { WelcomeLogoHero } from "../parks/WelcomeLogoHero.jsx";
import { Modal } from "../forms/Modal.jsx";
import "./Login.css";
import "./WelcomeModal.css";
import { WelcomeModal } from "./WelcomeModal.jsx";

export const Login = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  // open modal for welcome message seconds after the login page loads
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowModal(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();

    getUserByEmail(email).then((foundUsers) => {
      if (foundUsers.length === 1) {
        const user = foundUsers[0];
        localStorage.setItem(
          "parkplan_user",
          JSON.stringify({
            id: user.id,
            name: user.name,
          })
        );
        navigate("/");
      } else {
        window.alert("Invalid login");
      }
    });
  };

  return (
    <>
      <HomeHero />
      <div className="fade-in-block">
        <div className="auth-landscape-layout">
          <WelcomeLogoHero />
          <section className="login-block">
            <h2 className="subtitle">Please sign in</h2>
            <fieldset>
              <form className="email-input" onSubmit={handleLogin}>
                <input
                  type="email"
                  value={email}
                  onChange={(evt) => setEmail(evt.target.value)}
                  className="form-input"
                  placeholder="Email Address"
                  required
                  autoFocus
                />
                <div className="auth-link">
                  <button type="submit">Sign In</button>
                  <span>
                    Not a member? <Link to="/register">Create account</Link>
                  </span>
                </div>
              </form>
            </fieldset>
          </section>
          {showModal && (
            <div className="login-modal welcome-modal-wrapper">
              <Modal open={showModal} onClose={() => setShowModal(false)}>
                <WelcomeModal onClose={() => setShowModal(false)} />
              </Modal>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
