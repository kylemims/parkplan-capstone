import { Link, useNavigate } from "react-router-dom";
import "./NavBar.css";

export const NavBar = () => {
  const navigate = useNavigate();

  return (
    <ul className="navbar">
      <li className="navbar-item">
        <Link className="navbar-link" to="/">
          HOME
        </Link>
      </li>
      <li className="navbar-item">
        <Link className="navbar-link" to="/trips">
          TRIPS
        </Link>
      </li>
      <li className="navbar-item">
        <Link
          className="navbar-link"
          to=""
          onClick={() => {
            localStorage.removeItem("parkplan_user");
            navigate("/", { replace: true });
          }}>
          LOGOUT
        </Link>
      </li>
    </ul>
  );
};
