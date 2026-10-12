import { createConversationUseCase } from "../usecase/conversation/createConversation.usecase";

export interface IConversationModule{
    createConversation: createConversationUseCase
} 