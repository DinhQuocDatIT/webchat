import axiosInstance from "./axiosInstance";

export const sendMessgae = (message) => {
  return axiosInstance.post("/messages", message);
};
