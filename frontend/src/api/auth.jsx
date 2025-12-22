import axiosInstance from "./axiosInstance";
import { AuthService } from "../services/auth.service";

export const login = async (data) => {
  const res = await axiosInstance.post("/auth/signin", data);

  console.log(res.accessToken);
  console.log(res.user);
  AuthService.setToken(res.accessToken);
  AuthService.setUser(res.user);

  return res;
};

export const register = (data) => {
  return axiosInstance.post("/auth/register", data);
};

export const logout = () => {
  AuthService.logout();
};
