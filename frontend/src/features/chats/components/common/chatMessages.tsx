import { useEffect, useRef } from "react";

interface Message {
    id?: string;
    senderId: string;
    content: string;
}

interface ChatMessagesProps {
    messages: Message[];
    userId?: string;
}

export function ChatMessages({ messages, userId }: ChatMessagesProps) {
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <div className="mini-chat-box-body">
            {messages.length === 0 ? (
                <div className="mini-chat-box-empty">Bắt đầu gửi lời chào!</div>
            ) : (
                messages.map((msg) => {
                    const isMe = msg.senderId === userId;
                    return (
                        <div key={msg.id} className={`mini-chat-box-msg ${isMe ? "sent" : "received"}`}>
                            {msg.content}
                        </div>
                    );
                })
            )}
            <div ref={messagesEndRef} />
        </div>
    );
}

