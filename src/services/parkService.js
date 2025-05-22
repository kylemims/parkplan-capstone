const API_KEY = import.meta.env.VITE_NPS_API_KEY;
const API_BASE = import.meta.env.VITE_NPS_API_BASE;

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

export const GetNPSCampgrounds = () => {
  const parkCode = "yose"; // Yosemite
  const url = `${API_BASE}/campgrounds?parkCode=${parkCode}&api_key=${API_KEY}`;
  console.log("FETCHING FROM:", url); // Debug

  return fetch(url).then((res) => res.json());
};
