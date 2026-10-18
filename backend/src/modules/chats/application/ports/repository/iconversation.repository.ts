import { conversationEntity } from "../../../domain/entities/conversation.entity";
import { conversationWithUsers } from "../../types/conversation.type";

export interface IConversationRepository{
    createConversation(conversation : conversationEntity):Promise<conversationWithUsers>;
    findDirectConversation(user1Id : string, user2Id : string):Promise<conversationWithUsers|null>;
    getConversationByUser(userId : string):Promise<conversationWithUsers[]>;
}