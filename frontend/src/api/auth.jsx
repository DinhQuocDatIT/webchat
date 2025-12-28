import axiosInstance from "./axiosInstance";
import { AuthService } from "../services/auth.service";

export const login = async (data) => {
  const res = await axiosInstance.post("/auth/signin", data);
  AuthService.setToken(res.accessToken);
  AuthService.setUser(res.user);

  return res;
};

export const register = (data) => {
  return axiosInstance.post("/auth/signup", data);
};

export const logout = () => {
  AuthService.logout();
};
