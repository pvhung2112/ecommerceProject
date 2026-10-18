
import { conversationEntity } from "../../domain/entities/conversation.entity";
export interface conversationWithUsers {
    conversation: conversationEntity; 
    users: {
        id: string;
        name: string;
    }[];              
}