import { Express } from "express";
import { IAppContainer } from "../../infrastructure/containers/app.container";
import { productRouter } from "../../../modules/catalog/presentation/routes/product.route";
import { categoryRouter } from "../../../modules/catalog/presentation/routes/category.route";

export const registerAppRoutes = (app: Express, container: IAppContainer, prefix: string) => {
    app.use(`${prefix}/products`, productRouter(container.catalog));
    app.use(`${prefix}/categories`, categoryRouter(container.catalog));
};
