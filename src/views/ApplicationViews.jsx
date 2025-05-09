import { Routes, Route } from "react-router-dom";
import { Login } from "../components/auth/Login";
import { Register } from "../components/auth/Register";

export const ApplicationViews = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Add other routes here once user is logged in */}
    </Routes>
  );
};
