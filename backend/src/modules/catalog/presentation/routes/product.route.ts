import { Router } from "express";
import { ICatalogContainer } from "../../infrastructure/containers/catalog.container";
import { productController } from "../controllers/product.controller";

export const productRouter = (deps: ICatalogContainer): Router => {
    const controller = new productController(deps);
    const router = Router();

    router.get("/", controller.getAll);
    router.get("/:id", controller.getDetail);
    router.post("/create", controller.createOne);
    router.patch("/edit/:id", controller.editOne);
    router.patch("/edit-multi", controller.editMulti);
    router.patch("/delete/:id", controller.deleteOne);

    return router;
};
