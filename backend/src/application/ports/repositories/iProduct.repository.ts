import { productEntity } from "../../../domain/entities/product.entity";

export interface IProductRepository{
    getAll(): Promise<productEntity[]>;
}