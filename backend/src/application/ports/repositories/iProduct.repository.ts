import { productEntity } from "../../../domain/entities/product.entity";
import { productWithUser } from "../type/product.type";

export interface IProductRepository{
    getAll(): Promise<productWithUser[]>;
    createOne(input: productEntity): Promise<productWithUser>;
    getDetail(input : string) : Promise<productWithUser | null>;
    editOne(input : productEntity) : Promise<productWithUser>;
    deleteOne(intput : productEntity) : Promise<void>;
}