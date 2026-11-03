import CellersPage from "../../pages/clients/cellers/cellersPage";
import HomePage from "../../pages/clients/homePage";
import RecruitmentPage from "../../pages/clients/jobs/recruitmentPage";
import {DashboardLayout} from "../../shared/layouts/dashboardLayout";
import {MainLayout} from "../../shared/layouts/mainLayout";
import {ProtectedRoute} from "../protected.route";
import { clientProductRoutes, sellerProductRoutes } from "../../features/product";
import { clientCategoryRoutes, sellerCategoryRoutes } from "../../features/category";
import ChatPage from "../../pages/clients/chats/chatPage";
import { AuthLayout } from "../../shared/layouts/authLayout";
import { LoginPage } from "../../pages/clients/auth/login";
import { RegisterPage } from "../../pages/clients/auth/register";
import { RegisterSellerPage } from "../../pages/clients/auth/registerSeller";
import { LoginSellerPage } from "../../pages/clients/auth/loginSeller";

export const clientRouters = [
    //login và đăng kí
   {
    element: <AuthLayout />,
    children: [
        { path: "/login", element: <LoginPage /> },
        { path: "/register", element: <RegisterPage /> },
        { path: "/seller/login", element: <LoginSellerPage /> },
        { path: "/seller/register", element: <RegisterSellerPage /> }
    ]
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
    },{
        element : <ProtectedRoute allowedRoles={['CUSTOMER']} redirectPath="/login"/>,
        children : [
            {
                path : "/",
                element : <MainLayout/>,
                children : [
                    {
                        path : "/chat",
                        element : <ChatPage/>
                    }
                ]
            }
            
           
        ]
    }
]