import { IMessageRepository } from "../../ports/repository/imessage.repository";
import { messageOutputDto } from "../../dtos/messages/message.outputDto";
import { getMessagesInputDto } from "../../dtos/messages/message.inputDto";

export class getMessagesByConversationIdUseCase {
    constructor(private iMessageRepository: IMessageRepository) { }
    async execute(input: getMessagesInputDto):Promise<messageOutputDto[]> {
        const result =  await this.iMessageRepository.getMessagesByConversationId(input.conversationId,input.currentId);
        return result.map((message) => {
            return {
                id: message.massage.getId(),
                conversationId: message.massage.getConversationId(),
                senderId: message.massage.getSenderId(),
                content: message.massage.getContent(),
                status: message.massage.getStatus(),
                createdAt: message.massage.getCreatedAt(),
                sender: {
                    id: message.sender.id,
                    name: message.sender.name
                }
            }
        });
    }
}