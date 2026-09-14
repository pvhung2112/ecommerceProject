import { getAllproductusecase } from "../../application/usecases/products/getAll.usecase";
import { createOneproductusecase } from "../usecases/products/createOne.usecase";
import { editMultiproductusecase } from "../usecases/products/editMany.usecase";
import { editOneproductusecase } from "../usecases/products/editOne.usecase";
import { getDetailproductusecase } from "../usecases/products/getDetail.usecase";
export interface iProductsContainer{
    getAllProductsUsecase : getAllproductusecase;
    createOneProductUsecase : createOneproductusecase;
    getDetailProductUsecase : getDetailproductusecase;
    editOneProductUsecase : editOneproductusecase;
    editMuiltiProductUsecase : editMultiproductusecase;
}