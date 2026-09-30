import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { clientRouters } from "./clients/index.route";
import { AdminLogin } from "./admin/index.route";

const router = createBrowserRouter([
    ...clientRouters,
    ...AdminLogin
]);

function RouterApp() {
    return (
        <RouterProvider router={router} />
    );
}

export default RouterApp;