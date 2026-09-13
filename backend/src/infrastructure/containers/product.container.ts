
import { productRepository } from "../../infrastructure/database/repositories/prisma-product.client"
import { IProductRepository } from "../../application/ports/repositories/iProduct.repository";
import { getAllproductusecase } from "../../application/usecases/products/getAll.usecase";
import { iProductsContainer } from "../../application/containers/iproducts.container";
import { createOneproductusecase } from "../../application/usecases/products/createOne.usecase";
export const IContainerProduct  =() : iProductsContainer =>{
    const repositoryProduct : IProductRepository = new productRepository();
    return{
        getAllProductsUsecase : new getAllproductusecase(repositoryProduct),
        createOneProductUsecase : new createOneproductusecase(repositoryProduct)
    }
}