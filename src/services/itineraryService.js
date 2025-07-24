// itineraryService.js
// Handles CRUD for trip itinerary items (activities and campgrounds)

const BASE_URL = "http://localhost:8088";

// GET all itinerary items for a specific trip
export const getTripItemsByTripId = (tripId) => {
  return fetch(`${BASE_URL}/tripItems?tripId=${tripId}`).then((res) => res.json());
};

// POST a new item to a trip itinerary
// itemObj = { tripId, type, title, description, duration }
export const createTripItem = (itemObj) => {
  return fetch(`${BASE_URL}/tripItems`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(itemObj),
  }).then((res) => {
    if (!res.ok) {
      throw new Error("Failed to add itinerary item");
    }
    return res.json();
  });
};

// DELETE an itinerary item
export const deleteTripItem = (id) => {
  return fetch(`${BASE_URL}/tripItems/${id}`, {
    method: "DELETE",
  });
};

// UPDATE an itinerary item
export const updateTripItem = (id, updatedItem) => {
  return fetch(`${BASE_URL}/tripItems/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedItem),
  }).then((res) => res.json());
};
