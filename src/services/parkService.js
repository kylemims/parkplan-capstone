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

// For Vite or similar build tools, use import.meta.env; otherwise, provide a fallback or set the key directly.
const NPS_API_KEY = import.meta.env.VITE_NPS_API_KEY || "";

export const getParkActivities = (YOSE) => {
  return fetch(
    "https://developer.nps.gov/api/v1/activities/parks?parkCode=YOSE&api_key=8HSLm5kpVVDb9Aw8dFhIDfB4uT2hsd0u2yffMmer"
  ).then((res) => res.json(YOSE));
};
console.log(getParkActivities("YOSE"));
