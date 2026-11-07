import type { RouteObject } from "react-router-dom";
import CategoriesPage from "../../../pages/clients/categories/categoriesPage";
import CategoryDetailPage from "../../../pages/clients/categories/categoryDetailPage";
import CreateCategoryPage from "../../../pages/clients/categories/createCategoryPage";
import EditCategoryPage from "../../../pages/clients/categories/editCategoryPage";
import ManageCategoryPage from "../../../pages/clients/categories/manageCategoryPage";
import { categoryPaths } from "./category.paths";

export const clientCategoryRoutes: RouteObject[] = [
    {
        path: "categories",
        children: [
            { index: true, element: <CategoriesPage /> },
            { path: categoryPaths.detail.path, element: <CategoryDetailPage /> },
        ],
    },
];

export const sellerCategoryRoutes: RouteObject[] = [
    {
        path: "categories",
        children: [
            { index: true, element: <CategoriesPage /> },
            { path: categoryPaths.seller.detail.path, element: <CategoryDetailPage /> },
        ],
    },
];

export const adminCategoryRoutes: RouteObject[] = [
    {
        path: "categories",
        children: [
            { index: true, element: <ManageCategoryPage /> },
            { path: categoryPaths.admin.create.path, element: <CreateCategoryPage /> },
            { path: categoryPaths.admin.edit.path, element: <EditCategoryPage /> },
            { path: categoryPaths.admin.detail.path, element: <CategoryDetailPage /> },
        ],
    },
];
