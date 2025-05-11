export const getAllParks = () => {
  // GET request to JSON server
  return (
    fetch("http://localhost:8088/parks")
      // when we return each park object, expand the related trip data instead of just the trip_id
      .then((res) => res.json())
  );
};
export const getParksById = (id) => {
  return fetch(`http://localhost:8088/parks/${id}`).then((res) => res.json());
};
