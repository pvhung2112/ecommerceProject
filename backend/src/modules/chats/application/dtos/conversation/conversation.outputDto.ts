
export interface ConversationUserDto {
    id: string;
    name: string;
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