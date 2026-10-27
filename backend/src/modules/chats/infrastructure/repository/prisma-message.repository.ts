import { IMessageRepository } from "../../application/ports/repository/imessage.repository";
import { messageEntity } from "../../domain/entities/message.entity";
import { messageMapper } from "../mappers/massage.mapper";
import { prisma } from "../../../../shared/database/prisma.client";
import { messageWithUsers } from "../../application/types/message.type";
export class messageRepository implements IMessageRepository {
    async createMessage(message: messageEntity): Promise<messageWithUsers> {
        const inputDb = messageMapper.toPersistence(message);
        const saveMessage = await prisma.message.create({
            data: inputDb,
            include: {
                sender: {
                    select: {
                        id: true,
                        profile: {
                            select: {
                                fullName: true
                            }
                        }
                    },
                  
                },
                conversation: {
                        select: {
                            users : {
                                select : {
                                    id : true
                                }
                            }
                        }
                    }
            }
        })
        return {
            massage: messageMapper.toDomain(saveMessage),
            sender: {
                id: saveMessage.sender.id,
                name: saveMessage.sender.profile?.fullName || `user${saveMessage.sender.id}`
            },
            receiverIds: saveMessage.conversation.users.filter((user) => user.id !== saveMessage.senderId).map((user) => user.id)
        }
    }
    async getMessagesByConversationId(conversationId: string,currentId: string): Promise<messageWithUsers[]> {
        const getMessages = await prisma.message.findMany({
            where: {
                conversationId: conversationId,
                conversation: {
                    users: {
                        some: {
                            id: currentId       
                        }
                    }
                }
            },
            include: {
                sender: {
                    select: {
                        id: true,
                        profile: {
                            select: {
                                fullName: true
                            }
                        }
                    }
                }
            },
            orderBy: {
                createdAt: "asc"
            }
        })
        return getMessages.map((message) => {
            return {
                massage: messageMapper.toDomain(message),
                sender: {
                    id: message.sender.id,
                    name: message.sender.profile?.fullName || `user${message.sender.id}`
                }
            }

        });
    }
}