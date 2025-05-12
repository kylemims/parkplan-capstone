import { Routes, Route } from "react-router-dom";
import { TripDashboard } from "../components/trips/TripDashboard.jsx";
import { Login } from "../components/auth/Login";
import { Register } from "../components/auth/Register";
import { Authorized } from "./Authorized";
import { ParkSelector } from "../components/parks/ParkSelector.jsx";
import { TripEditForm } from "../components/forms/TripEditForm.jsx";

export const ApplicationViews = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/"
        element={
          <Authorized>
            <ParkSelector />
          </Authorized>
        }
      />
      <Route
        path="/trips"
        element={
          <Authorized>
            <TripDashboard />
          </Authorized>
        }
      />
      <Route
        path="/trips/:tripId/edit"
        element={
          <Authorized>
            <TripEditForm />
          </Authorized>
        }
      />
    </Routes>
  );
};
