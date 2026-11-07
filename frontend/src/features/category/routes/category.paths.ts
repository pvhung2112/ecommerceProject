export const categoryPaths = {
    root: "/categories",
    detail: {
        path: ":id",
        url: (id: string) => `/categories/${id}`,
    },

    seller: {
        root: "categories",
        detail: {
            path: ":id",
            url: (id: string) => `/cellers/categories/${id}`,
        },
    },

    admin: {
        root: "categories",
        manage: "/admin/categories",
        create: {
            path: "create",
            url: "/admin/categories/create",
        },
        edit: {
            path: "edit/:id",
            url: (id: string) => `/admin/categories/edit/${id}`,
        },
        detail: {
            path: ":id",
            url: (id: string) => `/admin/categories/${id}`,
        },
    }
};
