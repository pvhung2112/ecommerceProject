import { conversationOutputDto } from "../../dtos/conversation/conversation.outputDto";
import { IConversationRepository } from "../../ports/repository/iconversation.repository";
export class getAllConversationUseCase{
    constructor(private iConversationRepository : IConversationRepository){}
    async execute(userId : string) : Promise<conversationOutputDto[]>{
        const data = await this.iConversationRepository.getConversationByUser(userId);
        const result : conversationOutputDto[] = data.map((item:any) => {
            return {
                id: item.conversation.getId(),
                name: item.conversation.getName() || "",
                isGroup: item.conversation.getIsGroup(),
                lastMessage: item.conversation.getLastMessage() || "",
                users : item.users.map((u:any) => ({
                        id: u.getId(),
                        email: u.getEmail(),
                })),
                createdAt: item.conversation.getCreatedAt(),
                updatedAt: item.conversation.getUpdatedAt(),
            }
        });
       return result;
    }
}