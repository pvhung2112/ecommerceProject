import { Footer } from "../components/partials/footer";
import { Header } from "../components/partials/header";
import { Outlet } from "react-router-dom"; 
function MainLayout(){
    return(
        <>
        <Header/>
        <main className="main-content">
            <Outlet />
        </main>
        <Footer/>
        </>
    )
}
export default MainLayout;