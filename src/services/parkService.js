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
const VITE_NPS_API_KEY = import.meta.env.VITE_NPS_API_KEY || "";

export const getParkCampgrounds = (parkCode) => {
  return fetch(
    `https://developer.nps.gov/api/v1/campgrounds?parkCode=${parkCode}&api_key=${VITE_NPS_API_KEY}`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((response) => console.log(response));
};
// console.log(getParkCampgrounds("yose"));

// response?.data?.map((campground) => ({
// data?.map((campground) => ({
//   id: campground.id,
//   name: campground.name,
// })))}
// )
// .catch((error) => {
//   console.error("NPS API Error:", error.message);
//   return [];
// });
// }
