import { Router } from "express";
import { ICatalogModule } from "../../infrastructure/modules/catalog.module";
import { productController } from "../controllers/product.controller";

export const productRouter = (deps: ICatalogModule): Router => {
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
