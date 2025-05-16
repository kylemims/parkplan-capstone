export const getAllParks = () => {
  // GET request to JSON server
  return fetch("http://localhost:8088/parks").then((res) => res.json());
};
export const getParksById = (id) => {
  return fetch(`http://localhost:8088/parks/${id}`).then((res) => res.json());
};
export const getImagesByParkId = (parkId) => {
  return fetch(`http://localhost:8088/images?parkId=${parkId}`).then((res) => res.json());
};
export const getParkById = (parkId) => {
  return fetch(`http://localhost:8088/parks/${parkId}`).then((res) => res.json());
};
