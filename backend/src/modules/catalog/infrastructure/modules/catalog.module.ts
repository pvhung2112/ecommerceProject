import { initProductModule } from "./product.module";
import { initCategoryModule } from "./category.module";
import { ICatalogModule } from "../../application/modules/icatalog.module";

export { ICatalogModule } from "../../application/modules/icatalog.module";

export const initCatalogModule = (): ICatalogModule => {
    return {
        product: initProductModule(),
        category: initCategoryModule()
    };
};
