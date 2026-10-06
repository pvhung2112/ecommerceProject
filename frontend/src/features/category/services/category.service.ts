import api from "../../../lib/axios";
import type { CategoryInput } from "../types/category.type";

export const categoryService = {
    getAll: async () => {
        const response = await api.get("/categories");
        return response.data;
    },
    getDetail: async (id: string) => {
        const response = await api.get(`/categories/${id}`);
        return response.data;
    },
    createOne: async (payload: CategoryInput) => {
        const response = await api.post("/categories/create", payload);
        return response.data;
    },
    editOne: async (payload: Partial<CategoryInput>, id: string) => {
        const response = await api.patch(`/categories/${id}`, payload);
        return response.data;
    },
    deleteOne: async (id: string) => {
        const response = await api.delete(`/categories/${id}`);
        return response.data;
    },
};
