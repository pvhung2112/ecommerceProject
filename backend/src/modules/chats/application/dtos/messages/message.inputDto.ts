export interface createMessageInputDto {
    conversationId: string;
    senderId: string;
    content: string;
}
export interface getMessagesInputDto {
    conversationId: string;
    currentId: string;
}