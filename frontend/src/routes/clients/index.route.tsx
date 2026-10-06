import { LoginPage } from "../../pages/clients/auth/login";
import CellersPage from "../../pages/clients/cellers/cellersPage";
import HomePage from "../../pages/clients/homePage";
import RecruitmentPage from "../../pages/clients/jobs/recruitmentPage";
import DashboardLayout from "../../shared/layouts/dashboardLayout";
import MainLayout from "../../shared/layouts/mainLayout";
import ProtectedRoute from "../protected.route";
import { clientProductRoutes, sellerProductRoutes } from "../../features/product";
import { clientCategoryRoutes, sellerCategoryRoutes } from "../../features/category";

export const clientRouters = [
    {
        path : "/login",
        element : <LoginPage/>
    },
    // public 
    {
        path : "/",
        element : <MainLayout/>,
        children : [
            {
                index : true,
                element : <HomePage/>
            },
            ...clientProductRoutes,
            ...clientCategoryRoutes,
            {
                path : "/tuyendung",
                element : <RecruitmentPage/>
            }
        ]
    },
    // private 
    {
        element : <ProtectedRoute allowedRoles={['cellers']} redirectPath="/login"/>,
        children : [
            {
                path : "/cellers",
                element : <DashboardLayout/>,
                children : [
                    {
                        index : true,
                        element : <CellersPage/>,
                    },
                    ...sellerProductRoutes,
                    ...sellerCategoryRoutes,
                ]
            }
        ]
    }
]