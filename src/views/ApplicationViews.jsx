import { Routes, Route } from "react-router-dom";
import { TripList } from "../components/trips/TripList";
import { TripForm } from "../components/trips/TripForm";
import { Login } from "../components/auth/Login";
import { Register } from "../components/auth/Register";
import { Authorized } from "./Authorized";

export const ApplicationViews = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/"
        element={
          <Authorized>
            <TripList />
          </Authorized>
        }
      />

      <Route
        path="/trips/create"
        element={
          <Authorized>
            <TripForm />
          </Authorized>
        }
      />
    </Routes>
  );
};
