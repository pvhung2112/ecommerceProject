import { Request, Response } from "express";
import { IChatModule } from "../../application/modules/ichat.module";
import { conversationGetDetailInputDto, conversationOneToOneInputDto } from "../../application/dtos/conversation/conversation.inputDto";

export class conversationController{
    constructor(private dependencies: IChatModule) {}
    getAll = async (req : Request,res : Response)=>{
            const getConversationMe = (req as any).user.userId;
            console.log(getConversationMe);
            const result = await this.dependencies.conversation.getAllConversation.execute(getConversationMe);
            return res.status(200).json({
                message: "lấy thành công danh sách trò chuyện của tôi",
                data: result
            })

    }
    getDetail = async (req : Request,res : Response)=>{

        const getcurrentId = (req as any).user.userId;

        const { id } = req.params;
        const input : conversationGetDetailInputDto = {
            id : id as string,
            currentId : getcurrentId
        }
        
        const result = await this.dependencies.conversation.getDetailConversation.execute(input);

        return res.status(200).json({
            message: "lấy thành công danh sách trò chuyện của tôi",
            data: result
        })

        
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
            message : "tạo conversation one to one thành công",
            data: result
        });
    }
}