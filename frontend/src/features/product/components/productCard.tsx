import { useNavigate } from "react-router-dom";
import { chatAPiService } from "../../chats/services/chat.service";
import type { ProductCardProps } from "../types/product.type";

export function ProductCard({ data }: ProductCardProps) {
    const receiverId = data.user.id;
    console.log("Bấm vào người bán:", {
        sellerName: data.user.name,
        receiverId: receiverId
    });

    const navigate = useNavigate();
    const handleClick = async (receriverId: string) => {
        const createChat = await chatAPiService.createConversation(receriverId)
        console.log(createChat.data.id)
        navigate("/chat", { state: { conversationId: createChat.data.id } });
    }

    return (
        <div className="product-card">
            <h3>{data.name}</h3>
            <p>{data.price} đ</p>
            <p>Người bán: {data.user.name}</p>
            <button onClick={() => handleClick(data.user.id)}>nhắn tin</button>
        </div>
    );
}

export default ProductCard;