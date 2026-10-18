import { userEntity } from "../../../identity/domain/entities/user.entity";
import { conversationEntity } from "../../domain/entities/conversation.entity";
export interface conversationWithUsers {
    conversation: conversationEntity; 
    users: userEntity[];              
}