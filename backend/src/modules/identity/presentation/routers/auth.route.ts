import { Router } from "express";
import { IIdentityModule } from "../../application/modules/iidentity.module";
import { authController } from "../controllers/auth.controller";
export const authRouter = (deps: IIdentityModule): Router => {
    const router = Router();
    const controller = new authController(deps);
    router.post("/register", controller.register);
    router.post("/login", controller.login);
    router.post("/refresh-token", controller.refreshToken);
    return router;
}