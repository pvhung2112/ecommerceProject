import { createConversationUseCase } from "../usecase/conversation/createConversation.usecase";
import { getAllConversationUseCase } from "../usecase/conversation/getAllConversation.usecase";
export interface IConversationModule{
    createConversation: createConversationUseCase,
    getAllConversation : getAllConversationUseCase
} 