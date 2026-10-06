import type { RouteObject } from "react-router-dom";
import CategoriesPage from "../../../pages/clients/categories/categoriesPage";
import CategoryDetailPage from "../../../pages/clients/categories/categoryDetailPage";
import CreateCategoryPage from "../../../pages/clients/categories/createCategoryPage";
import EditCategoryPage from "../../../pages/clients/categories/editCategoryPage";
import ManageCategoryPage from "../../../pages/clients/categories/manageCategoryPage";

export const clientCategoryRoutes: RouteObject[] = [
    {
        path: "categories",
        children: [
            { index: true, element: <CategoriesPage /> },
            { path: ":id", element: <CategoryDetailPage /> },
        ],
    },
];


export const sellerCategoryRoutes: RouteObject[] = [
    {
        path: "categories",
        children: [
            { index: true, element: <CategoriesPage /> },
            { path: ":id", element: <CategoryDetailPage /> },
        ],
    },
];


export const adminCategoryRoutes: RouteObject[] = [
    {
        path: "categories",
        children: [
            { index: true, element: <ManageCategoryPage /> },
            { path: "create", element: <CreateCategoryPage /> },
            { path: "edit/:id", element: <EditCategoryPage /> },
            { path: ":id", element: <CategoryDetailPage /> },
        ],
    },
];
