import { IProductRepository } from "../../../application/ports/repositories/iProduct.repository";
import { productEntity } from "../../../domain/entities/product.entity";
import { prisma } from "../prisma.client";

export class productRepository implements IProductRepository{
    async getAll(): Promise<productEntity[]> {
        const productTable = await prisma.product.findMany();
        return productTable.map((item :any)=>{
            return new productEntity(item.id, item.name, item.price, item.userId);
        })
    }
}