export const getUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

export const getRole = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user?.role;
};

export const logout = () => {
  localStorage.removeItem("user");
};
//commit6