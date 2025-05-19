import { Routes, Route, Outlet } from "react-router-dom";
import { NavBar } from "../components/nav/NavBar.jsx";
import { Login } from "../components/auth/Login.jsx";
import { Register } from "../components/auth/Register.jsx";
import { Authorized } from "./Authorized";
import { HomePage } from "../components/parks/HomePage.jsx";
import { TripDashboard } from "../components/trips/TripDashboard.jsx";
import { TripEditForm } from "../components/forms/TripEditForm.jsx";
import { ParkDetails } from "../components/parks/ParkDetails";
import { TripCard } from "../components/trips/TripCard.jsx";

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
                <HomePage />
              </Authorized>
            }
          />
          <Route path="/parks/:parkId" element={<ParkDetails />} />
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
          {/* <Route
            path="/tripcard"
            element={
              <Authorized>
                <TripCard />
              </Authorized>
            }
          /> */}
        </Route>
      </Routes>
    </>
  );
};
