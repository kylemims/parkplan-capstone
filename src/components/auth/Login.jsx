import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import { getUserByEmail } from "../../services/userService";
import { FormInput } from "../forms/FormInput.jsx";

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
    <div className="container-login">
      <div className="login-background">
        <form className="trip-form" onSubmit={handleLogin}>
          <h1>Pick A Park</h1>
          <h3>Please sign in</h3>
          <FormInput
            type="email"
            id="tripName"
            value={email}
            onChange={(evt) => setEmail(evt.target.value)}
            placeholder="Email address"
          />
          <fieldset className="signin-fieldset">
            <div className="form-group">
              <button className="home-btn" type="submit">
                Sign in
              </button>
            </div>
          </fieldset>
        </form>
      </div>
      <div className="register-link">
        <p>New to Pick A Park?</p>
        <Link to="/register">Get Registered Here</Link>
      </div>
    </div>
  );
};

{
  /* return (
    <div className="container-login">
      <div className="login-background">
        <form className="form-login" onSubmit={handleLogin}>
          <h1>Pick A Park</h1>
          <h3>Please sign in</h3>
          <fieldset className="login-fieldset">
            <div className="form-group">
              <input
                type="email"
                value={email}
                onChange={(evt) => setEmail(evt.target.value)}
                className="form-control"
                placeholder="Email address"
                required
                autoFocus
              />
            </div>
          </fieldset>
          <fieldset className="signin-fieldset">
            <div className="form-group">
              <button className="home-btn" type="submit">
                Sign in
              </button>
            </div>
          </fieldset>
        </form>
      </div>
      <div className="register-link">
        <p>New to Pick A Park?</p>
        <Link to="/register">Get Registered Here</Link>
      </div>
    </div>
  );
}; */
}
