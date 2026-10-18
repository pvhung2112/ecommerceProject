import { messageEntity } from "../../domain/entities/message.entity";

export class messageMapper{
    static toDomain(raw: any): messageEntity {
        return new messageEntity(
            raw.id,
            raw.conversationId,
            raw.senderId,
            raw.content,
            raw.status,
            raw.createdAt,
        );
    }
    static toPersistence(message : messageEntity){
        return {
            conversationId:message.getConversationId(),
            senderId:message.getSenderId(),
            content:message.getContent(),
            status:message.getStatus(),
            createdAt:message.getCreatedAt()
        }
    }
}