import { useChat } from "../../hooks/useChat";
import { MiniChatBox } from "./miniChatBoxItem";
import "../../styles/miniChatBoxManager.css";

export function MiniChatboxManager(){
    const {activeChats ,closeChat} = useChat();
    return(
        <>
        {activeChats.length > 0 && < div className="mini-chat-manager">
            {activeChats.map((conversationId) => (
                <MiniChatBox key={conversationId} conversationId={conversationId} closeChat={()=>{closeChat(conversationId)}} />
            ))}
        </div>}
        </>
    )
}