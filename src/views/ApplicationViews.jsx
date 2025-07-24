import { Routes, Route, Outlet } from "react-router-dom";
import { NavBar } from "../components/nav/NavBar.jsx";
import { Login } from "../components/auth/Login.jsx";
import { Register } from "../components/auth/Register.jsx";
import { Authorized } from "./Authorized";
import { HomePage } from "../components/parks/HomePage.jsx";
import { TripDashboard } from "../components/trips/TripDashboard.jsx";
import { TripEditForm } from "../components/forms/TripEditForm.jsx";
import { ParkDetails } from "../components/parks/ParkDetails";
import { TripDetails } from "../components/trips/TripDetails.jsx";
import { CampgroundSelector } from "../components/parks/CampgroundSelector.jsx";
import { HomeTest } from "../components/parks/HomeTest.jsx";
import { TripSummary } from "../components/trips/TripSummary.jsx";
import { PreferencesForm } from "../components/onboarding/PreferencesForm.jsx";
import { ParkResults } from "../components/parks/ParkResults.jsx";

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
          <Route path="/preferences" element={<PreferencesForm />} />
          <Route path="/parks/results" element={<ParkResults />} />
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
            path="/trips/:tripId/details/:parkCode"
            element={
              <Authorized>
                <TripDetails />
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
          <Route
            path="/trips/:tripId/summary"
            element={
              <Authorized>
                <TripSummary />
              </Authorized>
            }
          />
          <Route path="/hometest" element={<HomeTest />} />
          <Route path="/trips/:tripId/campgrounds" element={<CampgroundSelector />} />
        </Route>
      </Routes>
    </>
  );
};
