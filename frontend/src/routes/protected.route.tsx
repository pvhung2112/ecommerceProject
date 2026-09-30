
import { Outlet } from "react-router-dom";

interface ProtectedRouteProps {
    allowedRoles?: string[];
    redirectPath?: string;
}

export default function ProtectedRoute({ allowedRoles = [], redirectPath = "/login"}: ProtectedRouteProps) {
    const isAuthenticated = true;
    const userRole = "Cellers";

    if (!isAuthenticated) {
        console.warn(`Redirecting to ${redirectPath}`);
    }

    if (allowedRoles.length > 0 && !allowedRoles.includes(userRole)) {
        console.warn(`User role ${userRole} not allowed`);
    }

    return <Outlet />;
}