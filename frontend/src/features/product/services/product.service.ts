import api from "../../../lib/axios";

export const productService = {

    getAll: async () => {
        const response = await api.get("/products");
        return response.data;
    },
    getDetail: async (id: string) => {
        const response = await api.get(`/products/${id}`);
        return response.data;
    },
    createOne: async (payload: any) => {
        const response = await api.post("/products/create", payload);
        return response.data;
    },
    editOne: async (payload: any, id: string) => {
        const response = await api.patch(`/products/${id}`, payload);
        return response.data;
    },
    editMulti: async (payload: any) => {
        const response = await api.patch("/products/edit-multi", payload);
        return response.data;
    },
    deleteOne: async (id: string) => {
        const response = await api.patch(`/products/delete/${id}`);
        return response.data;
    }
}