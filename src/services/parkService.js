const API_KEY = import.meta.env.VITE_NPS_API_KEY;
const API_BASE = import.meta.env.VITE_NPS_API_BASE;
const LOCAL_API_BASE = import.meta.env.VITE_API_BASE;

export const getAllParks = () => {
  return fetch(`${LOCAL_API_BASE}/parks`).then((res) => res.json());
};

export const getParkById = (parkId) => {
  return fetch(`${LOCAL_API_BASE}/parks/${parkId}`).then((res) => res.json());
};

export const getImagesByParkId = (parkId) => {
  return fetch(`${LOCAL_API_BASE}/images?parkId=${parkId}`).then((res) => res.json());
};

export const getAllImages = () => {
  return fetch(`${LOCAL_API_BASE}/images`).then((res) => res.json());
};

export const GetNPSCampgrounds = (parkCode) => {
  if (!parkCode) {
    console.error("GetNPSCampgrounds: parkCode is required");
    return Promise.reject(new Error("Park code is required"));
  }

  const url = `${API_BASE}/campgrounds?parkCode=${parkCode}&limit=5&api_key=${API_KEY}`;
  return fetch(url).then((res) => res.json());
};
