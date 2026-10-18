import { userEntity } from "../../../../identity/domain/entities/user.entity";

export interface ConversationUserDto {
    id: string;
    email?: string;
}
export interface conversationOutputDto {
    id : string;
    name : string;
    isGroup : boolean;
    lastMessage : string;
    users : ConversationUserDto[];
    createdAt : Date;
    updatedAt : Date;
}