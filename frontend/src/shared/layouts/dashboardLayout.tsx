
import { Outlet } from "react-router-dom";

export function DashboardLayout(){
    return(
        <>  
       
        <main className="main-content">
            <Outlet />
        </main>
       
        </>
    )
}
