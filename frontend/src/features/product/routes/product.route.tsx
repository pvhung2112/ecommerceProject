import type { RouteObject } from "react-router-dom";
import ProductPage from "../../../pages/clients/products/productsPage";
import ProductDetailPage from "../../../pages/clients/products/productDetailPage";
import CreateProductPage from "../../../pages/clients/products/createProductpage";
import EditProductPage from "../../../pages/clients/products/editProductPage";
import ManageProductPage from "../../../pages/clients/products/manageProductPage";

export const clientProductRoutes: RouteObject[] = [
    {
        path: "products",
        children: [
            { index: true, element: <ProductPage /> },
            { path: ":id", element: <ProductDetailPage /> },
        ],
    },
];


export const sellerProductRoutes: RouteObject[] = [
    {
        path: "products",
        children: [
            { index: true, element: <ManageProductPage /> },
            { path: "create", element: <CreateProductPage /> },
            { path: "edit/:id", element: <EditProductPage /> },
        ],
    },
];


export const adminProductRoutes: RouteObject[] = [
    {
        path: "products",
        children: [
            { index: true, element: <ManageProductPage /> },
            { path: "create", element: <CreateProductPage /> },
            { path: "edit/:id", element: <EditProductPage /> },
        ],
    },
];
