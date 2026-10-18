import axios from "axios";
import { appConfig } from "../configs/app.config";

export const api = axios.create({
  baseURL: appConfig.apiUrl,
  withCredentials: true, 
  headers: {
    "Content-Type": "application/json",
  }
});

api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
