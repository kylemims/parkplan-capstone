const BASE_URL = import.meta.env.VITE_API_BASE;

export const getTripItemsByTripId = (tripId) => {
  return fetch(`${BASE_URL}/tripItems?tripId=${tripId}`).then((res) => res.json());
};

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

export const deleteTripItem = (id) => {
  return fetch(`${BASE_URL}/tripItems/${id}`, {
    method: "DELETE",
  });
};

export const updateTripItem = (id, updatedItem) => {
  return fetch(`${BASE_URL}/tripItems/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedItem),
  }).then((res) => res.json());
};
