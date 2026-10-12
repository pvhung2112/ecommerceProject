import { conversationEntity } from "../../domain/entities/conversation.entity";

export class conversationMapper{
    static toPersistence(conversation : conversationEntity){
        return {
            name:conversation.getName(),
            users : {
                connect : conversation.getUserIds()?.map((userid)=>{
                    return {id : userid}
                })
            },
            isGroup:conversation.getIsGroup(),
            lastMessage:conversation.getLastMessage(),
            createdAt:conversation.getCreatedAt(),
            updatedAt:conversation.getUpdatedAt()
        }
    }
    static toDomain(raw: any): conversationEntity {
        const userIds = raw.users.map((userid : any)=>{
            return userid.id;
        })
        return new conversationEntity(
        raw.id,
        raw.name,
        raw.isGroup,
        raw.lastMessage,
        userIds,
        raw.users,
        raw.createdAt,
        raw.updatedAt
         );
  }
}