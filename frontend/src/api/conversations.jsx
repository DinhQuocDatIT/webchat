import { AuthService } from "../services/auth.service";
import axiosInstance from "./axiosInstance";
export const getConversations = () => {
  return axiosInstance.get("/conversations");
};
export const getConversationsById = (friendId) => {
  return axiosInstance.get(`/conversations/${friendId}`);
};
export const getContentConversation = (conversationId) => {
  return axiosInstance.get(
    `/conversations/content-conversation/${conversationId}`
  );
};
