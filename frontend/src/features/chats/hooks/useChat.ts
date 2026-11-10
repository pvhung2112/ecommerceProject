import { useContext } from "react";
import { ChatContext } from "../context/chat.context";

export const useChat = ()=>{
     const getContext = useContext(ChatContext);
    return getContext;
}
