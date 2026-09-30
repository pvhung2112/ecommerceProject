
import { LoginPage } from "../../pages/clients/auth/login";
import HomePage from "../../pages/clients/homePage";
import CreateProductPage from "../../pages/clients/products/createProductpage";
import ProductPage from "../../pages/clients/products/productsPage";
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
        element : <MainLayout/>,
        children : [
            {
                path : "/",
                element : <ProtectedRoute allowedRoles={['Cellers']} redirectPath="/login"/>,
                children : [
                    {
                        index : true,
                        element : <CreateProductPage/>
                    }
                ]
            }
            
        ]
    }
]