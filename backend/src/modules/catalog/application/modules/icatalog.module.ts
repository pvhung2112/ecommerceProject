import { IProductModule } from "./iproduct.module";
import { ICategoryModule } from "./icategory.module";

export interface ICatalogModule {
    product: IProductModule;
    category: ICategoryModule;
}
