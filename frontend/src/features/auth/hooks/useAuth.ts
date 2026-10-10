import { useContext } from "react"
import { AuthContext } from "../context/auth.context"

export const useAuth=()=>{
    const getContext = useContext(AuthContext);
    return getContext;
}