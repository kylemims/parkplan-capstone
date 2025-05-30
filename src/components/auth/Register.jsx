import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./Login.css";
import { createUser, getUserByEmail } from "../../services/userService";
import { FormInput } from "../forms/FormInput.jsx";

export const Register = () => {
  const [user, setUser] = useState({
    email: "",
    name: "",
  });
  let navigate = useNavigate();

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

  const handleRegister = (e) => {
    e.preventDefault();
    getUserByEmail(user.email).then((response) => {
      if (response.length > 0) {
        // Duplicate email. No good.
        window.alert("Account with that email address already exists");
      } else {
        // Good email, create user.
        registerNewUser();
      }
    });
  };

  const updateUser = (evt) => {
    const copy = { ...user };
    copy[evt.target.id] = evt.target.value;
    setUser(copy);
  };

  return (
    <div className="container-login">
      <div className="login-background">
        <form className="trip-form" onSubmit={handleRegister}>
          <h1>Pick A Park</h1>
          <h3>Please Register</h3>

          <FormInput onChange={updateUser} type="text" id="name" placeholder="Enter your name" />

          <fieldset className="signin-fieldset">
            <div className="form-group">
              <FormInput
                onChange={updateUser}
                type="email"
                id="email"
                placeholder="Email address"
              />
            </div>
          </fieldset>

          <fieldset>
            <div className="form-group">
              <button className="home-btn" type="submit">
                Register
              </button>
            </div>
          </fieldset>
        </form>
      </div>

      <section>
        <p>
          Already have an account?{" "}
          <Link to="/login">
            <strong>Sign in</strong>
          </Link>
        </p>
      </section>
    </div>
  );
};
