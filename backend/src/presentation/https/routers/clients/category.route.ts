import { Router } from "express";
import { dependencies } from "../../../../infrastructure/containers/index.container";
import { categoryController } from "../../controllers/category.controller";

export const categoryRouter = (deps: dependencies) => {
    const controller = new categoryController(deps);
    const router = Router();

    router.get("/", controller.getAll);
    router.get("/:id", controller.getDetail);
    router.post("/create", controller.createOne);

    return router;
};
