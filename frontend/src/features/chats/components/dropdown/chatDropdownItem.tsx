import "../../styles/chatDropdownItem.css";

const DEFAULT_AVATAR = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80";
export function ChatDropdownItem(props: any) {
    const { conversation, userId, onSelect } = props;
    const partner = conversation.users?.find((u: any) => u.id !== userId);
    
    return(  
        <div className="chat-item" onClick={onSelect}>
            <div className="chat-avatar-box">
                <img 
                    src={partner?.avatar || DEFAULT_AVATAR} 
                    alt={partner?.name} 
                    className="chat-avatar-img" 
                />
                <span className="online-dot" />
            </div>
            <div className="chat-info">
                <div className="chat-name">{partner?.name}</div>
                <div className="chat-lastmsg">
                    {conversation.lastMessage || "tin nhắn abc"}
                </div>
            </div>
        </div>
    )
}