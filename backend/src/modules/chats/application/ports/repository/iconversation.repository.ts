import { conversationEntity } from "../../../domain/entities/conversation.entity";

export interface IConversationRepository{
    createConversation(conversation : conversationEntity):Promise<conversationEntity>;
}