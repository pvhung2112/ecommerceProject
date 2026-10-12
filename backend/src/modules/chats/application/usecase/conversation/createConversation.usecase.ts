import { IConversationRepository } from "../../ports/repository/iconversation.repository";
import { conversationOutputDto } from "../../dtos/conversation/conversation.outputDto";
import { conversationEntity } from "../../../domain/entities/conversation.entity";
import { conversationOneToOneInputDto } from "../../dtos/conversation/conversation.inputDto";

export class createConversationUseCase {
    constructor(private iConversationRepository : IConversationRepository){}
    async execute(input : conversationOneToOneInputDto) : Promise<conversationOutputDto> {
      const newConversationEntity = new conversationEntity("", undefined,false,undefined,[input.senderId, input.receiverId]);
      const result = await this.iConversationRepository.createConversation(newConversationEntity);
      return {
        id: result.getId(),
        name: result.getName() || '',
        isGroup: result.getIsGroup() || false,
        lastMessage: result.getLastMessage() || '',
        userIds: result.getUsers() || [],
        createdAt: result.getCreatedAt() || new Date(),
        updatedAt: result.getUpdatedAt() || new Date(),
      };
        
    }
}

