export const productPaths = {
    root: "/products",
    detail: {
        path: ":slug/:id",
        url: (slug: string, id: string) => `/products/${slug}/${id}`,
    },

    seller: {
        root: "products",
        manage: "/cellers/products",
        create: {
            path: "create",
            url: "/cellers/products/create",
        },
        edit: {
            path: "edit/:id",
            url: (id: string) => `/cellers/products/edit/${id}`,
        },
    },


    admin: {
        root: "products",
        manage: "/admin/products",
        create: {
            path: "create",
            url: "/admin/products/create",
        },
        edit: {
            path: "edit/:id",
            url: (id: string) => `/admin/products/edit/${id}`,
        },
    }
};
