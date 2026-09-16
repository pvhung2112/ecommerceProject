import { Router } from "express";
import { ICatalogContainer } from "../../infrastructure/containers/catalog.container";
import { categoryController } from "../controllers/category.controller";

export const categoryRouter = (deps: ICatalogContainer): Router => {
    const controller = new categoryController(deps);
    const router = Router();

    router.get("/", controller.getAll);
    router.get("/:id", controller.getDetail);
    router.post("/create", controller.createOne);

    return router;
};
