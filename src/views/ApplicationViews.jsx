import { Routes, Route, Outlet } from "react-router-dom";
import { NavBar } from "../components/nav/NavBar.jsx";
import { Login } from "../components/auth/Login.jsx";
import { Register } from "../components/auth/Register.jsx";
import { Authorized } from "./Authorized";
import { TripEditForm } from "../components/forms/TripEditForm.jsx";
import { PreferencesForm } from "../components/onboarding/PreferencesForm.jsx";
import { BottomTabNav } from "../components/nav/BottomTabNav.jsx";
import { lazy, Suspense } from "react";
import { LoadingSpinner } from "../components/LoadingSpinner.jsx";

const TripDashboard = lazy(() => import("../components/trips/TripDashboard.jsx"));
const ParkResults = lazy(() => import("../components/parks/ParkResults.jsx"));
const HomePage = lazy(() => import("../components/parks/HomePage.jsx"));
const ParkDetails = lazy(() => import("../components/parks/ParkDetails.jsx"));
const TripDetails = lazy(() => import("../components/trips/TripDetails.jsx"));
const CampgroundSelector = lazy(() => import("../components/parks/CampgroundSelector.jsx"));
const TripSummary = lazy(() => import("../components/trips/TripSummary.jsx"));

export const ApplicationViews = () => {
  return (
    <div className="app-container">
      <NavBar />
      <Outlet />

      <main className="main-content">
        <Suspense fallback={<LoadingSpinner />}>
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
              <Route path="/trips/:tripId/campgrounds" element={<CampgroundSelector />} />
            </Route>
          </Routes>
        </Suspense>
      </main>
      <BottomTabNav />
    </div>
  );
};
