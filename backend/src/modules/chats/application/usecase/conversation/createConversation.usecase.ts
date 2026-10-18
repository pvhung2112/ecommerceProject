import { IConversationRepository } from "../../ports/repository/iconversation.repository";
import { conversationOutputDto } from "../../dtos/conversation/conversation.outputDto";
import { conversationEntity } from "../../../domain/entities/conversation.entity";
import { conversationOneToOneInputDto } from "../../dtos/conversation/conversation.inputDto";

export class createConversationUseCase {
    constructor(private iConversationRepository : IConversationRepository){}
    async execute(input : conversationOneToOneInputDto) : Promise<conversationOutputDto> {
      let targetConversation = await this.iConversationRepository.findDirectConversation(input.senderId, input.receiverId);
      if(!targetConversation){
        const newConversationEntity = new conversationEntity("", undefined,false,undefined,[input.senderId, input.receiverId]);
        targetConversation = await this.iConversationRepository.createConversation(newConversationEntity);
      }
      console.log(targetConversation);
      return {
        id: targetConversation.conversation.getId(),
        name: targetConversation.conversation.getName() || "",
        isGroup: targetConversation.conversation.getIsGroup(),
        lastMessage: targetConversation.conversation.getLastMessage() || "",
        users : targetConversation.users.map((u) => ({
                id: u.id,
                name: u.name,
        })),
        createdAt: targetConversation.conversation.getCreatedAt(),
        updatedAt: targetConversation.conversation.getUpdatedAt(),
      };
    }
}

