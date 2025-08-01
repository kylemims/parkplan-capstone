import { getCurrentUserId } from "./userService";

const LOCAL_API_BASE = import.meta.env.VITE_API_BASE;

// ✅ Get all trips for the *currently logged-in user*
export const getTripsForCurrentUser = () => {
  const userId = getCurrentUserId();
  return fetch(`${LOCAL_API_BASE}/trips?userId=${userId}&_expand=park`).then((res) => res.json());
};

// ✅ Still allow explicit access if needed
export const getTripsByUserId = (userId) => {
  return fetch(`${LOCAL_API_BASE}/trips?userId=${userId}&_expand=park`).then((res) => res.json());
};

export const createTrip = (tripObj) => {
  return fetch(`${LOCAL_API_BASE}/trips`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(tripObj),
  }).then((res) => {
    if (!res.ok) {
      throw new Error("Failed to create trip");
    }
    return res.json();
  });
};

export const deleteTrip = (id) => {
  return fetch(`${LOCAL_API_BASE}/trips/${id}`, {
    method: "DELETE",
  });
};

export const getTripById = (tripId) => {
  return fetch(`${LOCAL_API_BASE}/trips/${tripId}`).then((res) => res.json());
};

export const updateTrip = (tripId, updatedTripObj) => {
  return fetch(`${LOCAL_API_BASE}/trips/${tripId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedTripObj),
  }).then((res) => res.json());
};
