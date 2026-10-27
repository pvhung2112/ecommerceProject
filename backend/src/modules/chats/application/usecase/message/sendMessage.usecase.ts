import { IMessageRepository } from "../../ports/repository/imessage.repository";
import { messageEntity } from "../../../domain/entities/message.entity";
import { createMessageInputDto } from "../../dtos/messages/message.inputDto";
import { messageOutputDto } from "../../dtos/messages/message.outputDto";

export class sendMessageUseCase {
    constructor(private iMessageRepository: IMessageRepository) { }
    async execute(input: createMessageInputDto): Promise<messageOutputDto> {
        const message = new messageEntity("", input.conversationId, input.senderId, input.content, "sent", new Date());
        const result = await this.iMessageRepository.createMessage(message);
        return {
            id: result.massage.getId(),
            conversationId: result.massage.getConversationId(),
            senderId: result.massage.getSenderId(),
            content: result.massage.getContent(),
            status: result.massage.getStatus(),
            createdAt: result.massage.getCreatedAt(),
            sender: {
                id: result.sender.id,
                name: result.sender.name
            },
            receiverIds: result.receiverIds
        }
    }
}