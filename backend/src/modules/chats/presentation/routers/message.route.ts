import { Router } from "express";
import { IChatModule } from "../../application/modules/ichat.module";
import { messageController } from "../controllers/message.controller";
import { authMiddleware } from "../../../../shared/middlewares/auth.middleware";
export const messageRouter =(deps : IChatModule)=>{
    const router :Router=Router()
    const controller = new messageController(deps);
    router.post("/send",authMiddleware,controller.sendMessage);
    router.get("/conversation/:conversationId",authMiddleware,controller.getMessagesByConversationId);
    return router
}