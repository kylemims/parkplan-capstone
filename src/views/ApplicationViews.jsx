import { Routes, Route } from "react-router-dom";
import { TripList } from "../components/trips/TripList";
import { Login } from "../components/auth/Login";
import { Register } from "../components/auth/Register";
import { Authorized } from "./Authorized";
import { ParkSelector } from "../components/parks/ParkSelector.jsx";

export const ApplicationViews = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/trips"
        element={
          <Authorized>
            <TripList />
          </Authorized>
        }
      />

      <Route
        path="/"
        element={
          <Authorized>
            <ParkSelector />
          </Authorized>
        }
      />

      {/* <Route
        path="/trips/create"
        element={
          <Authorized>
            <TripForm />
          </Authorized>
        }
      /> */}
    </Routes>
  );
};
