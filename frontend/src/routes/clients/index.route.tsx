
import { LoginPage } from "../../pages/clients/auth/login";
import CellersPage from "../../pages/clients/cellers/cellersPage";
import HomePage from "../../pages/clients/homePage";
import CreateProductPage from "../../pages/clients/products/createProductpage";
import ProductPage from "../../pages/clients/products/productsPage";
import DashboardLayout from "../../shared/layouts/dashboardLayout";
import MainLayout from "../../shared/layouts/mainLayout";
import ProtectedRoute from "../protected.route";

export const clientRouters = [
    {
        path : "/login",
        element : <LoginPage/>
    },
    //public
    {
        path : "/",
        element : <MainLayout/>,
        children : [
            {
                index : true,
                element : <HomePage/>
            },
            {
                path : "/product",
                element : <ProductPage/>
            }
        ]
    },
    //private
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
                    {
                        path : "create-product",
                        element : <CreateProductPage/>,
                    },
                ]
            }
        ]
    }
            
]