import { IConversationRepository } from "../../ports/repository/iconversation.repository";
import { conversationOutputDto } from "../../dtos/conversation/conversation.outputDto";
import { conversationGetDetailInputDto } from "../../dtos/conversation/conversation.inputDto";
export class getDetailConversationUseCase{
    constructor(private iConversationRepository : IConversationRepository){}
    async execute(input : conversationGetDetailInputDto ) : Promise<conversationOutputDto|null>{
        const data = await this.iConversationRepository.getDetailConversation(input.id, input.currentId);
        if(!data) return null;
        const result : conversationOutputDto = {
            id: data.conversation.getId(),
            name: data.conversation.getName() || "",
            isGroup: data.conversation.getIsGroup(),
            lastMessage: data.conversation.getLastMessage() || "",
            users: data.users.map((u:any) => ({
                    id: u.id,
                    name: u.name,
            })),
            createdAt: data.conversation.getCreatedAt(),
            updatedAt: data.conversation.getUpdatedAt(),
        };
       return result;
    }
}