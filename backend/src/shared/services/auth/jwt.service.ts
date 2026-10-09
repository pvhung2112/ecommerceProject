import jwt from 'jsonwebtoken';
import { JWT_CONFIG } from "../../../config/jwt.config";
export class jwtService {
    static signAcessToken(payload: any): string {
        return jwt.sign(payload, JWT_CONFIG.ACCESS.SECRET as string, {
            expiresIn: JWT_CONFIG.ACCESS.EXPIRATION
        } as any)
    }
    static signRefreshToken(payload: any): string {
        return jwt.sign(payload, JWT_CONFIG.REFRESH.SECRET as string, {
            expiresIn: JWT_CONFIG.REFRESH.EXPIRATION
        } as any)
    }
    static verifyAccessToken(token: string): any {
        return jwt.verify(token, JWT_CONFIG.ACCESS.SECRET as string);
    }
    static verifyRefreshToken(token: string): any {
        return jwt.verify(token, JWT_CONFIG.REFRESH.SECRET as string);
    }
    static decodeToken(token: string): any {
        return jwt.decode(token);
    }
}