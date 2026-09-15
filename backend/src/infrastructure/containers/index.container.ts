import { IContainerProduct } from "./product.container";
import { IContainerCategory } from "./category.container";

export const containerMain = () => {
    return {
       product: IContainerProduct(),
       category: IContainerCategory()
    };
};
export type dependencies = ReturnType<typeof containerMain>;