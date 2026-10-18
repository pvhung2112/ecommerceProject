import { IConversationModule } from "../../application/modules/iconversation.module"
import { createConversationUseCase } from "../../application/usecase/conversation/createConversation.usecase";
import { getAllConversationUseCase } from "../../application/usecase/conversation/getAllConversation.usecase";
import { conversationRepository } from "../repository/prisma-conversation.repository"

export const initConversationModule = (): IConversationModule => {
    const conversationRepo =  new conversationRepository();

    return {
        createConversation : new createConversationUseCase(conversationRepo),
        getAllConversation: new getAllConversationUseCase(conversationRepo)
    }
}