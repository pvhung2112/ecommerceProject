import { Router } from "express";
import { IIdentityModule } from "../../infrastructure/modules/identity.module";
import { roleController } from "../controllers/role.controller";

export const roleRouter = (deps: IIdentityModule): Router => {
    const router = Router();
    const controller  = new roleController(deps);
    router.get("/",controller.getAll);
    router.get("/:id",controller.getDetail);
    router.post("/create",controller.createOne);
    router.patch("/edit/:id",controller.editOne);
    router.patch("/edit-multi",controller.editMulti);
    router.patch("/delete/:id",controller.deleteOne);
    return router;
};       