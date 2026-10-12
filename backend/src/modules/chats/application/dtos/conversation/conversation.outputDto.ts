export interface ConversationUserDto {
    id: string;
    email?: string;
}
export interface conversationOutputDto {
    id : string;
    name : string;
    isGroup : boolean;
    lastMessage : string;
    userIds : ConversationUserDto[];
    createdAt : Date;
    updatedAt : Date;
}