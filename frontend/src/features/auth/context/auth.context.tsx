import { createContext, useEffect, useState, type ReactNode } from "react";
import api from "../../../lib/axios"; 
export interface AuthProviderProps {
    children: ReactNode;
}
export interface AuthContextType {
    user : any;
    login: (userData: any) => void;
    
}
export const AuthContext = createContext<AuthContextType | null>(null);

//đây là component authprovider bọc vào 1 component con
export const AuthProvider = (props: AuthProviderProps) => {
    const [user,setUser] = useState();
    const login = (userData : any)=>{
        setUser(userData);
    }
    useEffect(() => {
        api.get("/profiles/me")
            .then((res) => {
                console.log(res);
                setUser(res.data.data);
            })
            .catch(() => {  
                setUser(null);
            });
    }, []); 

    const contextValue: AuthContextType = {
        user: user,  
        login: login 
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {props.children}
        </AuthContext.Provider>
    )
    
}