import { Server as HttpServer } from 'http';
import { Server as SocketIOServer } from 'socket.io'; 

export const initSocketService =(httpServer : HttpServer)=>{
    const io = new SocketIOServer(httpServer,{
        cors: { origin: '*', credentials: true }
    });
    io.on('connection',(socket)=>{
        console.log(`${socket.id} connected`);
        
        socket.on('disconnect',()=>{
            console.log(`${socket.id} disconnected`);
        })
    })

    
    
}