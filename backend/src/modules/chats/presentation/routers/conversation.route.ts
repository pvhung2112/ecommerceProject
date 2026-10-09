import {  Router } from "express";
import { IChatModule } from "../../application/modules/ichat.module";
import { conversationController } from "../controllers/conversation.controller";

export const conversationRouter = (deps: IChatModule): Router => {
    const controller = new conversationController(deps);
    const router = Router();

    router.get("/", controller.getAll);
    router.get("/:id", controller.getDetail);

    return router;
}