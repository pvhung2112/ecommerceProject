import { Request, Response } from "express";
import { IChatModule } from "../../application/modules/ichat.module";
import { conversationOneToOneInputDto } from "../../application/dtos/conversation/conversation.inputDto";

export class conversationController{
    constructor(private dependencies: IChatModule) {}
    getAll = async (req : Request,res : Response)=>{

    }
    getDetail = async (req : Request,res : Response)=>{
        
    }
    createConversation = async (req : Request,res : Response)=>{
        const {receiverId} = req.body;
        const senderId = (req as any).user.userId;
        const input : conversationOneToOneInputDto = {
            senderId: senderId,
            receiverId: receiverId
        }
        const result = await this.dependencies.conversation.createConversation.execute(input);
        return res.status(201).json({
            message : "tạo conversationonetoone thành công",
            data: result
        });
    }
}