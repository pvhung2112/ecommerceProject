import { useRef } from "react";

interface ChatInputProps {
    onSend: (content: string) => void;
}

export function ChatInput({ onSend }: ChatInputProps) {

    const inputRef = useRef<HTMLInputElement>(null);

    const handleClick = () => {
        if (!inputRef.current) return;

        const content = inputRef.current.value;

        onSend(content);
        inputRef.current.value = "";
        inputRef.current.focus();
    };

    return (
        <div className="mini-chat-box-footer">
            <input
                type="text"
                placeholder="Nhập tin nhắn..."
                ref={inputRef}
                className="mini-chat-box-input"
            />
            <button onClick={handleClick} className="mini-chat-box-btn">
                Gửi
            </button>
        </div>
    );
}

