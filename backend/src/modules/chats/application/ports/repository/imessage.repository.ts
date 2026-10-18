import { messageEntity } from "../../../domain/entities/message.entity";
import { messageWithUsers } from "../../types/message.type";
export interface IMessageRepository {
    createMessage(message: messageEntity): Promise<messageWithUsers>;
    getMessagesByConversationId(conversationId: string,currentId: string): Promise<messageWithUsers[]>;
}