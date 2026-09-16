import { IContainerProduct } from "./product.container";
import { IContainerCategory } from "./category.container";
import { iProductsContainer } from "../../application/containers/iproducts.container";
import { iCategoriesContainer } from "../../application/containers/icategories.container";

export interface ICatalogContainer {
    product: iProductsContainer;
    category: iCategoriesContainer;
}

export const catalogContainer = (): ICatalogContainer => {
    return {
        product: IContainerProduct(),
        category: IContainerCategory()
    };
};
