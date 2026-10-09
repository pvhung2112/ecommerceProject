import { Router } from "express";
import { IChatModule } from "../../application/modules/ichat.module";
import { messageController } from "../controllers/message.controller";

export const messageRouter =(deps : IChatModule)=>{
    const router :Router=Router()
    const controller = new messageController(deps);
    return router
}