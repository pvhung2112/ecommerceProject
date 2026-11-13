import axios from "axios";
import { appConfig } from "../configs/app.config";

export const api = axios.create({
  baseURL: appConfig.apiUrl,
  withCredentials: true, 
  headers: {
    "Content-Type": "application/json",
  }
});
// như kiểu middleware của fe đều đi qua 2 chạm này 
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
  async (error) => {
    const originReq = error.config;
    console.log(originReq);
    if(error.response?.status === 401 && !originReq?._retry &&  
      !originReq.url?.includes("/auth/login") &&
      !originReq.url?.includes("/auth/refresh-token")){
        originReq._retry = true;
        await api.post("/auth/refresh-token");
        return api(originReq);
      }
    return Promise.reject(error);
  }
);


