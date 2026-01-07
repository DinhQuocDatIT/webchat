import axiosInstance from "./axiosInstance";

export const getUsers = () => {
  return axiosInstance.get("/users");
};
export const getUserByUsername = (username) => {
  return axiosInstance.get(`/users/by-username`, { params: { username } });
};
export const getUsersById = (userId) => {
  return axiosInstance.get(`/users/${userId}`);
};
export const changeAvatar = (file) => {
  const formData = new FormData();
  formData.append("file", file);

  return axiosInstance.post(
    "/users/change-avatar",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
};
