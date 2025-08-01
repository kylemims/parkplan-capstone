const API_KEY = import.meta.env.VITE_NPS_API_KEY;
const API_BASE = import.meta.env.VITE_NPS_API_BASE;

export const getThingsToDoByParkCode = (parkCode) => {
  const url = `${API_BASE}/thingstodo?parkCode=${parkCode}&limit=10&api_key=${API_KEY}`;
  return fetch(url).then((res) => {
    if (!res.ok) throw new Error("NPS fetch failed");
    return res.json();
  });
};
