import { getAllproductusecase } from "../../application/usecases/products/getAll.usecase";
import { createOneproductusecase } from "../usecases/products/createOne.usecase";
import { getDetailproductusecase } from "../usecases/products/getDetail.usecase";
export interface iProductsContainer{
    getAllProductsUsecase : getAllproductusecase;
    createOneProductUsecase : createOneproductusecase;
    getDetailProductUsecase : getDetailproductusecase;
}