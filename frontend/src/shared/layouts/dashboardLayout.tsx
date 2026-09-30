
import { Outlet } from "react-router-dom";

function DashboardLayout(){
    return(
        <>  
       
        <main className="main-content">
            <Outlet />
        </main>
       
        </>
    )
}
export default DashboardLayout;