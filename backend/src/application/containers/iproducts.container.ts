import { getAllproductusecase } from "../../application/usecases/products/getAll.usecase";
import { createOneproductusecase } from "../usecases/products/createOne.usecase";
export interface iProductsContainer{
    getAllProductsUsecase : getAllproductusecase;
    createOneProductUsecase : createOneproductusecase;
}