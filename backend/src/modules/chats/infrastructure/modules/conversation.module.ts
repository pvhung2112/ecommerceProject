import { IConversationModule } from "../../application/modules/iconversation.module"
import { createConversationUseCase } from "../../application/usecase/conversation/createConversation.usecase";
import { getAllConversationUseCase } from "../../application/usecase/conversation/getAllConversation.usecase";
import { conversationRepository } from "../repository/prisma-conversation.repository"
import { getDetailConversationUseCase } from "../../application/usecase/conversation/getDetailConversation.usecase";
export const initConversationModule = (): IConversationModule => {
    const conversationRepo =  new conversationRepository();

    return {
        getDetailConversation : new getDetailConversationUseCase(conversationRepo),
        createConversation : new createConversationUseCase(conversationRepo),
        getAllConversation: new getAllConversationUseCase(conversationRepo)
    }
}