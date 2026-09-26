import { Router } from "express";
import { IIdentityModule } from "../../infrastructure/modules/identity.module";
import { profileController } from "../controllers/profile.controller";
import { authMiddleware } from "../../../../shared/middlewares/auth.middleware";

export const profileRouter = (deps: IIdentityModule): Router => {
    const router = Router();
    const controller = new profileController(deps);
    router.use(authMiddleware);
    router.get("/", controller.getAll);
    router.get("/user/:userId", controller.getByUserId);
    router.get("/:id", controller.getDetail);
    router.post("/create", controller.createOne);
    router.patch("/edit/:id", controller.updateOne);

    return router;
};
