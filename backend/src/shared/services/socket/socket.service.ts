import { Server } from "socket.io";
import { socketAuthMiddleware } from "../../middlewares/socket-auth.middleware";
import type { Server as HttpServer } from "node:http";
import { appConfig } from "../../../config/app.config";
import { registerChatSocket } from "../../../modules/chats/presentation/socket/index.socket";
export class socketService {
    private static instance : socketService;
    private io : Server; 

    private constructor(httpServer : HttpServer){
        this.io = new Server(httpServer, {
            cors: {
                origin: appConfig.apiFrontend,
                credentials : true
            }
        });
        this.io.use(socketAuthMiddleware);
        this.registerEvents();
    }
    private registerEvents(): void {
        this.io.on("connection", (socket) => {
            console.log("User connected:", socket.id);
            if (socket.data.userId) {
                socket.join(socket.data.userId);
            }
            registerChatSocket(this.io,socket);
            socket.on("disconnect", () => {
                console.log("User disconnected:", socket.id);
            });
        });
    }
    public getIo() : Server {
        return this.io;
    }
    public static getInstance(httpServer?: HttpServer) : socketService {
        if(!socketService.instance){
            if(!httpServer) throw new Error("httpServer is required");
        socketService.instance = new socketService(httpServer);
        }
        return socketService.instance;
    }
    public baseEmit<T>(to : string | string[] , event : string,data : T,exceptSocketId?: string | string[]) : void {
        if(exceptSocketId){
            this.io.to(to).except(exceptSocketId).emit(event,data);
        }
        else {
            this.io.to(to).emit(event,data);
        }
    }
}