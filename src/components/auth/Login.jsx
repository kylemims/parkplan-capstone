import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { getUserByEmail } from "../../services/userService";

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
    <div className="auth-background">
      <video autoPlay muted loop playsInline className="background-video">
        <source src="/videos/bg-video-2.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="overlay">
        <form className="auth-container" onSubmit={handleLogin}>
          <p className="login-small-title">WELCOME TO</p>
          <h1 className="login-header">Pick-A-Park</h1>
          <img src="/images/pick-logo-5.svg" alt="Pick A Park logo" className="login-logo" />
          <h2 className="subtitle">Please sign in</h2>

          <fieldset>
            {/* <label htmlFor="inputEmail"> Email address </label> */}
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
          </fieldset>
          <div className="auth-link">
            <button type="submit">Sign in</button>
            <span>
              Not a member? <a href="/register">Register</a>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

//
