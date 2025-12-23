import axiosInstance from "./axiosInstance";

export const getUsers = () => {
  return axiosInstance.get("/users");
};
export const getUserByUsername = (username) => {
  return axiosInstance.get(`/users/by-username`, { params: { username } });
};
