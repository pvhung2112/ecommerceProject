import { IMessageModule } from "../../application/modules/imessage.module";
import { IMessageRepository } from "../../application/ports/repository/imessage.repository";
import { messageRepository } from "../repository/prisma-message.repository";
import { sendMessageUseCase } from "../../application/usecase/message/sendMessage.usecase";
import { getMessagesByConversationIdUseCase } from "../../application/usecase/message/getMessageByConversationID.usecase";

export const initMessageModule = (): IMessageModule => {
    const messageRepo : IMessageRepository = new messageRepository();
    return {
      sendMessage : new sendMessageUseCase(messageRepo),
      getMessagesByConversationId : new getMessagesByConversationIdUseCase(messageRepo)
    };
}