export interface messageUserDto {
    id: string;
    name: string;
}
export interface messageOutputDto {
    id: string;
    conversationId: string;
    senderId: string;
    content: string;
    status: string;
    createdAt: Date;
    sender : messageUserDto;
}
