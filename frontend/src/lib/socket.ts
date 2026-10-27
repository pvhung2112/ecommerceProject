import { io } from "socket.io-client";
import { appConfig } from "../configs/app.config";

const SOCKET_URL = appConfig.apiBackend;

const socket = io(SOCKET_URL, {
    withCredentials: true
});


socket.on("connect", () => {
    console.log("đã kết nối với server");
});

socket.on("disconnect", () => {
    console.log("mất kết nối với server");
});

export default socket;