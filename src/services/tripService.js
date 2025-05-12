//?-------------FETCH Trips by user (POST promise)----------------------
export const getTripsByUserId = (userId) => {
  return (
    fetch(`http://localhost:8088/trips?user_id=${userId}&expand=park`)
      // {userId} is interpolated to ensure users only see their own data
      .then((res) => res.json())
  );
};

//?--------------POST New Trip------------------------
export const createTrip = (tripObj) => {
  console.log("Posting trip:", tripObj);
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

//?----------------DELETE Trip------------------------------
export const deleteTrip = (tripId) => {
  return fetch(`http://localhost:8088/trips/${tripId}`, {
    method: "DELETE",
  });
};

//?-----------UPDATE trip (PUT)---------------------------
export const getTripById = (tripId) => {
  return (
    fetch(`http://localhost:8088/trips/${tripId}?_expand=park`)
      // adding ?_expand=park to show the park name while editing, if needed
      .then((res) => res.json())
  );
};

export const updateTrip = (tripId, updatedTripObj) => {
  return fetch(
    `http://localhost8088/trips/${tripId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTripObj),
    }.then((res) => res.json())
  );
};
