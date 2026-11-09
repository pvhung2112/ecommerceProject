import { useEffect, useState } from "react";
import { chatAPiService } from "../services/chat.service";
import { useAuth } from "../../auth";
import { ChatDropdownItem } from "./chatDropdownItem";
import "../styles/chatDropdown.css"; 
export function  ChatDropdownList() {
    const [conversations, setConversations] = useState([]);
    const auth = useAuth();
    const userId = auth.user.userId;
    console.log(userId);
    const fetchConversations = async ()=>{
        const apiConversation = await chatAPiService.getAllConversation();
        setConversations(apiConversation.data);
    }
    console.log(conversations);
    useEffect(()=>{
        fetchConversations();
    },[])
    return (
        <>
        <div className="chatdropdown-main">
            <div className="chatdropdown-header">
                <h3>Đoạn chat</h3>
            </div>
            <div className="chatdropdown-list">
                {conversations.map((conversation) => {
                    return (
                        <ChatDropdownItem key={conversation.id} conversation={conversation} userId={userId} 
                            onSelect={() => {
                                console.log("Đã chọn:", conversation);
                            }}
                        />
                    )
                })}
            </div>
            
        </div>
        </>
    );
}