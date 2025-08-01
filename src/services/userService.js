const LOCAL_API_BASE = import.meta.env.VITE_API_BASE;

export const getUserByEmail = (email) => {
  return fetch(`${LOCAL_API_BASE}/users?email=${email}`).then((res) => res.json());
};

export const createUser = (user) => {
  return fetch(`${LOCAL_API_BASE}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  }).then((res) => res.json());
};

export const getCurrentUserId = () => {
  const storedUser = localStorage.getItem("parkplan_user");
  if (!storedUser) return null;
  return JSON.parse(storedUser).id;
};
