
import { Socket } from "socket.io";
import { jwtService } from "../services/auth/jwt.service";

export const socketAuthMiddleware = (socket : Socket, next : (err?: Error) => void) => {

    const cookieHeader = socket.handshake.headers.cookie;
    console.log(cookieHeader);
    const accessToken = cookieHeader?.split("; ").find((cookie)=>cookie.startsWith("accessToken"))?.split("=")[1];
    if (!accessToken) {
        return next(new Error("ch đăng nhập"));
    }
    const decodeAccessToken = jwtService.verifyAccessToken(accessToken);
    socket.data.user = decodeAccessToken;
    socket.data.userId = decodeAccessToken.userId;
    console.log(decodeAccessToken);
    console.log(accessToken);
    next();
}