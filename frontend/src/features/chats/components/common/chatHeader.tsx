const DEFAULT_AVATAR = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80";

interface Partner {
    id: string;
    name: string;
    avatar?: string;
}

export function ChatHeader(props: { partner: Partner; closeChat: () => void }) {
    const { partner, closeChat } = props;
    return (
        <div className="mini-chat-box-header">
            <div className="mini-chat-box-partner">
                <img
                    src={partner?.avatar || DEFAULT_AVATAR}
                    alt={partner?.name}
                    className="mini-chat-box-avatar"
                />
                <span className="mini-chat-box-name">{partner?.name}</span>
            </div>
            <button className="mini-chat-box-close" onClick={closeChat}>
                x
            </button>
        </div>
    );
}
