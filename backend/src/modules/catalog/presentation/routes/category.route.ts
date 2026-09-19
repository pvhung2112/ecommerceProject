import { Router } from "express";
import { ICatalogModule } from "../../infrastructure/modules/catalog.module";
import { categoryController } from "../controllers/category.controller";

export const categoryRouter = (deps: ICatalogModule): Router => {
    const controller = new categoryController(deps);
    const router = Router();

    router.get("/", controller.getAll);
    router.get("/:id", controller.getDetail);
    router.post("/create", controller.createOne);

    return router;
};
