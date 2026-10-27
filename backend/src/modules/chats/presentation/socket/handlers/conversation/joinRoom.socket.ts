import { Server, Socket } from "socket.io";

export const joinRoomSocket = (io : Server,socket : Socket)=>{
    socket.on("chat:join-conversation",(conversationId : string)=>{
        if (conversationId) {
            socket.join(conversationId);
            console.log(`${socket.id} đã vào phòng chat ${conversationId}`);
        }
    });
    
    socket.on("chat:leave-conversation", (conversationId: string) => {
        if (conversationId) {
            socket.leave(conversationId);
            console.log(`${socket.id} đã rời phòng chat ${conversationId}`);
        }
    });

}