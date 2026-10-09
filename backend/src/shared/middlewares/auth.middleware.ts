import { NextFunction, Request, Response } from "express";
import { jwtService } from "../services/auth/jwt.service";


export const authMiddleware = (req : Request,res : Response , next : NextFunction)=>{
    try {
    const getAccessToken = req.cookies.accessToken;
    if(!getAccessToken){
        res.status(401).json({
                message: "Bạn chưa đăng nhập",
                code: "UNAUTHORIZED"
        });
        return;
    }
    const decodeToken = jwtService.verifyAccessToken(getAccessToken);
    (req as any).user = decodeToken;
    next();
    } catch (error:any) {
        res.status(403).json({
            message: "Truy cập bị từ chối",
            code: "FORBIDDEN"
        });
        return;
    }

}