
import { sendMessageUseCase } from "../usecase/message/sendMessage.usecase";
import { getMessagesByConversationIdUseCase } from "../usecase/message/getMessageByConversationID.usecase";

export interface IMessageModule{
    sendMessage :sendMessageUseCase,
    getMessagesByConversationId: getMessagesByConversationIdUseCase
}