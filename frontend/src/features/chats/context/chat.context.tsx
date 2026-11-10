import { createContext, useState, type ReactNode } from "react";
export interface ChatProviderProps{    
    children: ReactNode

}
export interface ChatContextType {
    activeChats : string[];
    openChat : (conversationId : string) => void;
    closeChat: (conversationId: string) => void;
}
export const ChatContext = createContext<ChatContextType | null>(null);

export const ChatProvider = (props : ChatProviderProps )=>{
    const [activeChats,setActiveChats] = useState<string[]>([]);
    const openChat = (conversationId : string)=>{
        setActiveChats((prev)=>{
            const find = prev.find(id => id === conversationId);
            if(find){
                return prev;
            }
            return [...prev,conversationId];
        })
    }
    const closeChat = (conversationId : string) => {
        setActiveChats((pre)=>{
            return pre.filter((id) => id !== conversationId);
        })
    }
    const contextValue: ChatContextType = {
            activeChats : activeChats,
            openChat : openChat,
          closeChat : closeChat
        };
    return (
        <ChatContext.Provider value={contextValue}>
            {props.children}
        </ChatContext.Provider>
    )
}