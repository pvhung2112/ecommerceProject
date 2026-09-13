import { Router } from "express";
import { dependencies } from "../../../../infrastructure/containers/index.container";
import { productController } from "../../controllers/products.controller";
export const productRouter = (deps : dependencies)=>{
    const controller = new productController(deps);
    const router =  Router();
    router.get("/", controller.getAll);
    router.get("/:id", controller.getDetail);
    router.post("/create", controller.createOne);

    return router;
}