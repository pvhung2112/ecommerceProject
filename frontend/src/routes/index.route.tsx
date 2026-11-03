import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { clientRouters } from "./clients/index.route";
import { AdminLogin } from "./admin/index.route";

const router = createBrowserRouter([
    ...clientRouters,
    ...AdminLogin
]);

export function RouterApp() {
    return (
        <RouterProvider router={router} />
    );
}

