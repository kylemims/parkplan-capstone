import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createUser, getUserByEmail } from "../../services/userService";
import { FormInput } from "../forms/FormInput.jsx";
import { HomeHero } from "../parks/HomeHero.jsx";
import { WelcomeLogoHero } from "../parks/WelcomeLogoHero.jsx";
import "./Login.css";

export const Register = () => {
  const [user, setUser] = useState({ email: "", name: "" });
  const navigate = useNavigate();

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
                placeholder="Name"
                required
                autoFocus
              />
              <br></br>
              <br></br>
              <input
                className="form-input"
                onChange={updateUser}
                type="email"
                id="email"
                placeholder="Email address"
                required
              />
            </form>
            <br></br>
            <div className="auth-link">
              <button type="submit">Register</button>
              <span>
                Not a member? <a href="/login">Sign in</a>
              </span>
            </div>
          </fieldset>
        </section>
      </div>
    </>
  );
};
