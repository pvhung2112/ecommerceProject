import { Request, Response } from "express";
import { IChatModule } from "../../application/modules/ichat.module";
import { createMessageInputDto, getMessagesInputDto } from "../../application/dtos/messages/message.inputDto";

export class messageController {
    constructor(private dependencies: IChatModule) { }
    sendMessage = async(req : Request, res : Response) =>{
        const {content , conversationId } = req.body;
        const senderId = (req as any).user.userId;
        const input : createMessageInputDto  ={
            content,
            conversationId,
            senderId
        } 
        const message = await this.dependencies.message.sendMessage.execute(input);
        return res.status(201).json({
            message : "gửi tin nhắn thành công",
            data : message
            
        });
    }
    getMessagesByConversationId = async(req : Request, res : Response) =>{
        const {conversationId} = req.params;
        const currentId = (req as any).user.userId;
        const input : getMessagesInputDto  = {
         conversationId  : conversationId as string,
            currentId : currentId
        }
        const messages = await this.dependencies.message.getMessagesByConversationId.execute(input);
        return res.status(200).json({
            message : "lấy danh sách tin nhắn thành công",
            data : messages
        });
    }
}