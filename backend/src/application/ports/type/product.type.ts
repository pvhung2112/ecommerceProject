import { productEntity } from "../../../domain/entities/product.entity";
export interface productWithUser {
    product: productEntity;
    user: {
        id: string;
        name: string;
    };
}
