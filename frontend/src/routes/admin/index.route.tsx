import { Navigate, type RouteObject } from "react-router-dom";
import { appConfig } from "../../configs/app.config";
import { LoginPage } from "../../pages/admin/auth/login";
import DashboardLayout from "../../shared/layouts/dashboardLayout";
import ProtectedRoute from "../protected.route";
import DashboardPage from "../../pages/admin/dashboardPage";
import CreateProductPage from "../../pages/clients/products/createProductpage";
export const AdminLogin: RouteObject[] = [
    {
       path : `${appConfig.adminPath}/login`,
       element : <LoginPage/>
    },
    {
        element : <ProtectedRoute redirectPath={`${appConfig.adminPath}/login`} allowedRoles={['admin']}/>,
        children : [
            {
                path : `${appConfig.adminPath}`,
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