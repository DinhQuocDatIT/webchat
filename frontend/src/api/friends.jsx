import axiosInstance from "./axiosInstance";

export const getFriendStatus = (idUser) => {
  return axiosInstance.get(`/friends/friend-status/${idUser}`);
};
export const addFriend = (idUser) => {
  return axiosInstance.post(`/friends/add/${idUser}`);
};
export const unFriend = (idUser) => {
  return axiosInstance.post(`/friends/unfriend/${idUser}`);
};
export const acceptFriend = (idUser) => {
  return axiosInstance.post(`/friends/accept/${idUser}`);
};
export const rejectFriend = (idUser) => {
  return axiosInstance.post(`/friends/reject/${idUser}`);
};
export const getFriend = () => {
  return axiosInstance.get("/friends/getfriend");
};
