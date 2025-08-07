import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createUser, getUserByEmail } from "../../services/userService";
import { HomeHero } from "../parks/HomeHero.jsx";
import { WelcomeLogoHero } from "../parks/WelcomeLogoHero.jsx";
import { WelcomeModal } from "./WelcomeModal.jsx";
import { Modal } from "../forms/Modal.jsx";
import "./WelcomeModal.css";
import "./Login.css";

export const Register = () => {
  const [user, setUser] = useState({ email: "", name: "" });
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setShowModal(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const registerNewUser = () => {
    createUser(user).then((createdUser) => {
      if (Object.prototype.hasOwnProperty.call(createdUser, "id")) {
        localStorage.setItem(
          "parkplan_user",
          JSON.stringify({
            id: createdUser.id,
          })
        );
        navigate("/");
      }
    });
  };

  const updateUser = (evt) => {
    const copy = { ...user };
    copy[evt.target.id] = evt.target.value;
    setUser(copy);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    getUserByEmail(user.email).then((response) => {
      if (response.length > 0) {
        window.alert("Account with that email address already exists");
      } else {
        registerNewUser();
      }
    });
  };

  return (
    <>
      <HomeHero />
      <div className="fade-in-block">
        <WelcomeLogoHero />
        <section className="login-block">
          <h2 className="subtitle">Create your account</h2>
          <fieldset>
            <form className="email-input" onSubmit={handleRegister}>
              <input
                className="form-input"
                onChange={updateUser}
                type="text"
                id="name"
                placeholder="Make up any name you want"
                required
                autoFocus
              />
              <input
                className="form-input"
                onChange={updateUser}
                type="email"
                id="email"
                placeholder="sillyname@example.com"
                required
              />
              <div className="auth-link">
                <button type="submit">Create Account</button>
                <span>
                  Already have an account? <Link to="/login">Sign in</Link>
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
    </>
  );
};
