import api from "../../../lib/axios";
import type { LoginPayload, RegisterPayload } from "../types/auth.types";

export const authService = {
  login: async (payload: LoginPayload) => {
    const response = await api.post("/auth/login", payload);
    return response.data;
  },

  register: async (payload: RegisterPayload) => {
    const response = await api.post("/auth/register", payload);
    return response.data;
  },

  refreshToken: async () => {
    const response = await api.post("/auth/refresh-token");
    return response.data;
  },
};

export default authService;
