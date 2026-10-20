import { IConversationRepository } from "../../application/ports/repository/iconversation.repository";
import { conversationEntity } from "../../domain/entities/conversation.entity";
import { prisma } from "../../../../shared/database/prisma.client";
import { conversationMapper } from "../mappers/conversation.mapper";
import { conversationWithUsers } from "../../application/types/conversation.type";

export class conversationRepository implements IConversationRepository {
    async createConversation(conversation: conversationEntity): Promise<conversationWithUsers> {
        const inputDb = conversationMapper.toPersistence(conversation);
        console.log("inputDb", inputDb)
       const newConversation = await prisma.conversation.create({
            data: inputDb,
            include: {
                users: {
                    select : {
                        id : true,
                        profile : {
                        select : {
                            fullName : true
                        }
                    }
                    }
                }
            }
        })
        console.log(newConversation);
        return {
            conversation: conversationMapper.toDomain(newConversation),
            users : newConversation.users.map((user)=>{
                return {
                    id : user.id,
                    name : user.profile?.fullName || `user${user.id}`
                }
            })
        }

    }
    async findDirectConversation(user1Id: string, user2Id: string): Promise<conversationWithUsers | null> {
        const getConversation = await prisma.conversation.findFirst({
            where : {
                isGroup : false,
                AND : [
                    {users : {
                        some : {
                            id : user1Id
                        }
                    }},
                    {users : {
                        some : {
                            id : user2Id
                        }
                    }}
                ]
            },
            include : {
                users: {
                    select : {
                        id : true,
                        profile : {
                        select : {
                            fullName : true
                        }
                    }
                    }
                }
            }
        })
        if(!getConversation) return null;
        else return {
            conversation : conversationMapper.toDomain(getConversation),
            users : getConversation.users.map((user)=>{
                return {
                    id : user.id,
                    name : user.profile?.fullName || `user${user.id}`
                }
            })
        }
        
    }

    async getConversationByUser(userId: string): Promise<conversationWithUsers[]> {
   
        const getAllConversation = await prisma.conversation.findMany(
            {
                where: {
                    users: {
                        some : {
                            id : userId
                        }
                    }
                },
                include : {
                    users: {
                    select : {
                        id : true,
                        profile : {
                        select : {
                            fullName : true
                        }
                    }
                    }
                }
                }
            }
        )
        console.log(getAllConversation);
        //[conversation]
        return getAllConversation.map((conversation)=>{
            return {
                conversation: conversationMapper.toDomain(conversation),
                users : conversation.users.map((user)=>{
                    return {
                    id : user.id,
                    name : user.profile?.fullName || `user${user.id}`
                }
                })
            }
        })
    }
    async getDetailConversation(conversationId: string, currentId: string): Promise<conversationWithUsers | null> {
        const conversation = await prisma.conversation.findFirst({
            where : {
                id : conversationId,
                users : {
                    some : {id : currentId}
                }
            },
            include : {
                users: {
                    select : {
                        id : true,
                        profile : {
                        select : {
                            fullName : true
                        }
                    }
                    }
                }
            }
        })
        if(!conversation) return null;
        else return {
            conversation : conversationMapper.toDomain(conversation),
            users : conversation.users.map((user)=>{
                return {
                    id : user.id,
                    name : user.profile?.fullName || `user${user.id}`
                }
            })
        }
    }
}
