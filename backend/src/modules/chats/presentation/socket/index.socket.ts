import { Server, Socket } from "socket.io";
import { joinRoomSocket } from "./handlers/conversation/joinRoom.socket";

export const registerChatSocket =(io : Server,socket : Socket)=>{
   joinRoomSocket(io,socket);
}