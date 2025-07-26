import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getUserByEmail } from "../../services/userService";
import { HomeHero } from "../parks/HomeHero.jsx";
import { WelcomeLogoHero } from "../parks/WelcomeLogoHero.jsx";
import "./Login.css";

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
      <HomeHero />
      <div className="fade-in-block">
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
      </div>
    </>
  );
};
