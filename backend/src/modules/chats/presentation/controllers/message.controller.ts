import { Request, Response } from "express";
import { IChatModule } from "../../application/modules/ichat.module";
import { createMessageInputDto, getMessagesInputDto } from "../../application/dtos/messages/message.inputDto";
import { socketService } from "../../../../shared/services/socket/socket.service";

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
        socketService.getInstance().baseEmit(conversationId,"chat:receive-Message",message);
        if (message.receiverIds && message.receiverIds.length > 0) {
            socketService.getInstance().baseEmit(message.receiverIds, "chat:notify-receive-Message", {
                conversationId: conversationId,
                content: message.content,
                senderName: message.sender.name
            });
        }
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