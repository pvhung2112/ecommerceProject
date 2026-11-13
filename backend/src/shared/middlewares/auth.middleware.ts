import { NextFunction, Request, Response } from "express";
import { jwtService } from "../services/auth/jwt.service";


export const authMiddleware = (req : Request,res : Response , next : NextFunction)=>{
        const getAccessToken = req.cookies.accessToken;
        if(!getAccessToken){
            res.status(401).json({
                message: "Bạn chưa đăng nhập hoặc token đã hết hạn",
                code: "UNAUTHORIZED"
            })
            return;
        }
    try {
        const decodeToken = jwtService.verifyAccessToken(getAccessToken);
        (req as any).user = decodeToken;
    } catch (error : any) {

        if (error.name === "TokenExpiredError") {
            res.status(401).json({
                message: "Access token đã hết hạn",
                code: "TOKEN_EXPIRED"
            });
            return;
        }

        res.status(401).json({
            message: "Token không hợp lệ",
            code: "INVALID_TOKEN"
        });
        return;
    }
   
    next();
}