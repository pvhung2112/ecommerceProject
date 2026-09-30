import { Navigate, type RouteObject } from "react-router-dom";
import { ADMIN_PATH } from "../../configs/route.config";
import { LoginPage } from "../../pages/admin/auth/login";
import DashboardLayout from "../../shared/layouts/dashboardLayout";
import ProtectedRoute from "../protected.route";
import DashboardPage from "../../pages/admin/dashboardPage";
import CreateProductPage from "../../pages/clients/products/createProductpage";
export const AdminLogin: RouteObject[] = [
    {
       path : `${ADMIN_PATH}/login`,
       element : <LoginPage/>
    },
    {
        element : <ProtectedRoute redirectPath={`${ADMIN_PATH}/login`} allowedRoles={['admin']}/>,
        children : [
            {
                path : `${ADMIN_PATH}`,
                element : <DashboardLayout/>,
                children : [
                    {
                        index : true,
                        element : <Navigate to="dashboard" replace />
                    } ,
                    {
                        path : "dashboard",
                        element : <DashboardPage/>
                    },{
                        path : "product/create",
                        element : <CreateProductPage/>
                    }                   
                ]

            }
        ]
    }
];