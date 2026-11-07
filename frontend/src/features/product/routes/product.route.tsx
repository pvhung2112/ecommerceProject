import type { RouteObject } from "react-router-dom";
import ProductPage from "../../../pages/clients/products/productsPage";
import {ProductDetailPage} from "../../../pages/clients/products/productDetailPage";
import CreateProductPage from "../../../pages/clients/products/createProductpage";
import EditProductPage from "../../../pages/clients/products/editProductPage";
import ManageProductPage from "../../../pages/clients/products/manageProductPage";
import { productPaths } from "./product.paths";

export const clientProductRoutes: RouteObject[] = [
    {
        path: "products",
        children: [
            { index: true, element: <ProductPage /> },
            { path: productPaths.detail.path, element: <ProductDetailPage /> },
        ],
    },
];

export const sellerProductRoutes: RouteObject[] = [
    {
        path: "products",
        children: [
            { index: true, element: <ManageProductPage /> },
            { path: productPaths.seller.create.path, element: <CreateProductPage /> },
            { path: productPaths.seller.edit.path, element: <EditProductPage /> },
        ],
    },
];

export const adminProductRoutes: RouteObject[] = [
    {
        path: "products",
        children: [
            { index: true, element: <ManageProductPage /> },
            { path: productPaths.admin.create.path, element: <CreateProductPage /> },
            { path: productPaths.admin.edit.path, element: <EditProductPage /> },
        ],
    },
];
