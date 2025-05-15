export const getTripsByUserId = (userId) => {
  return fetch(`http://localhost:8088/trips?userId=${userId}&_expand=park`).then((res) =>
    res.json()
  );
};

// POST request to create a new trip -> tripObj = { name, parkId, userId, createdAt })
export const createTrip = (tripObj) => {
  return fetch("http://localhost:8088/trips", {
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

// DELETE request to delete a trip by id
export const deleteTrip = (id) => {
  return fetch(`http://localhost:8088/trips/${id}`, {
    method: "DELETE",
  });
};

export const getTripById = (tripId) => {
  return fetch(`http://localhost:8088/trips/${tripId}`).then((res) => res.json());
};

// PUT request to update a trip -> (tripObj)
export const updateTrip = (tripId, updatedTripObj) => {
  return fetch(`http://localhost:8088/trips/${tripId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedTripObj),
  }).then((res) => res.json());
};
