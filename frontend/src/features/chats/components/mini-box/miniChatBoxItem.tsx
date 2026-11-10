import { useEffect, useState } from "react";
import { chatAPiService } from "../../services/chat.service";
import { useAuth } from "../../../auth";
import "../../styles/miniChatBoxItem.css";
import { ChatHeader } from "../common/chatHeader";
import { ChatMessages } from "../common/chatMessages";
import { ChatInput } from "../common/chatInput";
import socket from "../../../../lib/socket";

interface MiniChatBoxProps {
    conversationId: string;
    closeChat: () => void;
}

export function MiniChatBox({ conversationId, closeChat }: MiniChatBoxProps) {
    const auth = useAuth();
    const userId = auth?.user?.userId;

    const [conversation, setConversation] = useState(null);
    const [messages, setMessages] = useState([]);

    const fetchChatData = async () => {
            const [conversationRespond, messageRespond] = await Promise.all([
                chatAPiService.getDetailConversation(conversationId),
                chatAPiService.getMessagesByConversationId(conversationId)
            ]);
            setConversation(conversationRespond.data);
            setMessages(messageRespond.data);
        };

    useEffect(() => {
        fetchChatData();
        console.log(messages);
    }, [conversationId]);


    const partner = conversation?.users?.find((u: any) => u.id !== userId);
    
    const handleSend = async (content: string) => {
        const res = await chatAPiService.sendMessage(content, conversationId);
        setMessages((prev) => [...prev, res.data]);
    };

    return (
        <div className="mini-chat-box">
            <ChatHeader partner={partner} closeChat={closeChat}/>
            <ChatMessages messages={messages} userId={userId} />
            <ChatInput onSend={handleSend} />
        </div>
    );
}
