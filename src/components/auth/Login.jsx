import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { getUserByEmail } from "../../services/userService";
import { HomeHero } from "../parks/HomeHero.jsx";

export const Login = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

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
    <div className="auth-background">
      <video autoPlay muted loop playsInline className="background-video">
        <source src="/videos/bg-video-2.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="fade-in-block">
          <section className="welcome-container">
          <p className="small-title">WELCOME TO</p>
        <h1>Pick <span className="second-word">A</span>Park</h1>
          <img src="/images/pick-logo-5.svg" alt="Pick A Park logo" className="login-logo" />
          </section>
        <section className="login-block">
          <h2 className="subtitle">Please sign in</h2>
          <fieldset>
          <form className="email-input" onSubmit={handleLogin}>
            <input
              type="email"
              value={email}
              id="tripName"
              onChange={(evt) => setEmail(evt.target.value)}
              className="form-input"
              placeholder="Email"
              required
              autoFocus
              />
              </form>
          <div className="auth-link">
            <button type="submit">Sign in</button>
            <span>
              Not a member? <a href="/register">Register</a>
            </span>
          </div>
          </fieldset>
          </section>
              </div>
              </div>
          </>
  );
};


