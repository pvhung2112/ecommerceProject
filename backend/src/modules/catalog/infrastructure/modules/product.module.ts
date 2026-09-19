import { productRepository } from "../repositories/prisma-product.client";
import { IProductRepository } from "../../application/ports/repositories/iProduct.repository";
import { getAllproductusecase } from "../../application/usecases/products/getAll.usecase";
import { IProductModule } from "../../application/modules/iproduct.module";
import { createOneproductusecase } from "../../application/usecases/products/createOne.usecase";
import { getDetailproductusecase } from "../../application/usecases/products/getDetail.usecase";
import { editOneproductusecase } from "../../application/usecases/products/editOne.usecase";
import { editMultiproductusecase } from "../../application/usecases/products/editMany.usecase";

export const initProductModule = (): IProductModule => {
    const repositoryProduct: IProductRepository = new productRepository();
    return {
        getAllProductsUsecase: new getAllproductusecase(repositoryProduct),
        createOneProductUsecase: new createOneproductusecase(repositoryProduct),
        getDetailProductUsecase: new getDetailproductusecase(repositoryProduct),
        editOneProductUsecase: new editOneproductusecase(repositoryProduct),
        editMuiltiProductUsecase: new editMultiproductusecase(repositoryProduct)
    };
};
