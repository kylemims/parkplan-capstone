import { Routes, Route, Outlet } from "react-router-dom";
import { NavBar } from "../components/nav/NavBar.jsx";
import { Login } from "../components/auth/Login.jsx";
import { Register } from "../components/auth/Register.jsx";
import { Authorized } from "./Authorized";
import { ParkSelector } from "../components/parks/ParkSelector.jsx";
import { TripDashboard } from "../components/trips/TripDashboard.jsx";
import { TripEditForm } from "../components/forms/TripEditForm.jsx";

export const ApplicationViews = () => {
  return (
    <>
      <NavBar /> {/* NavBar is now outside Routes to appear on all views */}
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Outlet />
            </>
          }>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            index
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
        </Route>
      </Routes>
    </>
  );
};
