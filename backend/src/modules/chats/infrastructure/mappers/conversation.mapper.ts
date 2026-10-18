import { conversationEntity } from "../../domain/entities/conversation.entity";

export class conversationMapper{
    static toPersistence(conversation : conversationEntity){
        return {
            name:conversation.getName(),
            //vì db user dưới dạng [User] nên phải map
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
        return new conversationEntity(
        raw.id,
        raw.name,
        raw.isGroup,
        raw.lastMessage,
        raw.userIds,
        raw.createdAt,
        raw.updatedAt
        );
  }
}