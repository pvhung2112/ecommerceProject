import { IConversationRepository } from "../../application/ports/repository/iconversation.repository";
import { conversationEntity } from "../../domain/entities/conversation.entity";
import { prisma } from "../../../../shared/database/prisma.client";
import { conversationMapper } from "../mappers/conversation.mapper";

export class conversationRepository implements IConversationRepository{
    async createConversation(conversation: conversationEntity): Promise<conversationEntity> {
        const inputDb = conversationMapper.toPersistence(conversation);
        console.log("inputDb",inputDb)
        const newConversation = await prisma.conversation.create({
            data: inputDb,
            include : {
                users : true

            }
        })
        console.log(newConversation);
        return conversationMapper.toDomain(newConversation);
        
    }
}
