import axios from "axios";
import type { InternalAxiosRequestConfig } from "axios";

const authClient = axios.create({
  baseURL: "https://todo-redev.onrender.com/api",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

authClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.set("Authorization", `Bearer ${token}`);
  }
  return config;
});

export default authClient;