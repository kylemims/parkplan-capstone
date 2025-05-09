export const getAllParks = () => {
  // GET request to JSON server
  return (
    fetch("http://localhost:8088/parks")
      // when we return each park object, expand the related trip data instead of just the trip_id
      .then((res) => res.json())
  );
};

export const getTripsByUserId = (userId) => {
  // GET request to JSON server that includes "query parameters"
  return (
    fetch(`http://localhost:8088/trips?_expand=park&user_id=${userId}`)
      // when we reutrn each trip object, expand the related park data instead of just the park_id
      //* {userId} is interpolated to ensure users only see their own data
      .then((res) => res.json())
  );
};

//? Will need these later for CRUD ops
// export const createTrip = (tripObj) => { ... }
export const createTrip = (tripObj) => {
  return fetch("http://localhost:8088/trips", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(tripObj),
  }).then((res) => res.json());
};

// export const delteTrip = (tripId) => { ...}
//export const updateTrip = (tripId, updateObj) => { ... }
