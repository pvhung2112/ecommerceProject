import { createConversationUseCase } from "../usecase/conversation/createConversation.usecase";
import { getAllConversationUseCase } from "../usecase/conversation/getAllConversation.usecase";
import { getDetailConversationUseCase } from "../usecase/conversation/getDetailConversation.usecase";
export interface IConversationModule{
    createConversation: createConversationUseCase,
    getAllConversation : getAllConversationUseCase,
    getDetailConversation : getDetailConversationUseCase
} 