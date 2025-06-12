import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createUser, getUserByEmail } from "../../services/userService";
import { FormInput } from "../forms/FormInput.jsx";
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
    <div className="auth-background">
      <video autoPlay muted loop playsInline className="background-video">
        <source src="/videos/bg-video-2.mp4" type="video/mp4" />
      </video>

      <div className="overlay">
        <form className="auth-container" onSubmit={handleRegister}>
          <h1 className="login-header">Pick-A-Park</h1>
          <img src="/images/pick-logo-5.svg" alt="Pick A Park logo" className="login-logo" />
          <h2 className="subtitle">Create your account</h2>
          <fieldset>
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
            <input
              className="form-input"
              onChange={updateUser}
              type="email"
              id="email"
              placeholder="Email address"
              required
            />
          </fieldset>

          <button className="home-btn" type="submit">
            Register
          </button>

          <div className="auth-link">
            <p>Already have an account?</p>
            <Link to="/login">
              <strong>Sign in</strong>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
