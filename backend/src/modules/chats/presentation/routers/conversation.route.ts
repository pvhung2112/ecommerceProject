import {  Router } from "express";
import { conversationController } from "../controllers/conversation.controller";
import { IChatModule } from "../../application/modules/ichat.module";
import { authMiddleware } from "../../../../shared/middlewares/auth.middleware";
export const conversationRouter = (deps: IChatModule): Router => {
    const controller = new conversationController(deps);
    const router = Router();
    router.post("/create",authMiddleware,controller.createConversation);
    router.get("/", authMiddleware,controller.getAll);
    router.get("/:id", authMiddleware,controller.getDetail);

    return router;
}