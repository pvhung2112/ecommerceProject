import { IProductRepository } from "../../../application/ports/repositories/iProduct.repository";
import { productWithUser } from "../../../application/ports/type/product.type";
import { productEntity } from "../../../domain/entities/product.entity";
import { productMapper } from "../../mapper/product.mapper";
import { prisma } from "../prisma.client";

export class productRepository implements IProductRepository{
    async getAll(): Promise<productWithUser[]> {
        const productTable = await prisma.product.findMany({
            include :{
                user: {
                    select: {   
                        id: true,
                        name: true
                    }
                }
            }
        });
        console.log(productTable)
        return productTable.map((item: any) => {
            return {
                product: productMapper.toDomain(item),
                user: {
                    id: item.user.id,
                    name: item.user.name
                },
                slug: item.slug
            };
        });
    }
    async getDetail(input: string): Promise<productWithUser | null> {
        const productTable = await prisma.product.findUnique({
            where: { id: input },
            include: {
                user: {
                    select: {   
                        id: true,
                        name: true
                    }
                }
            }
        });
        if (!productTable) {
            return null;
        }

        return {
            product: productMapper.toDomain(productTable),
            user: {
                id: productTable.user.id,
                name: productTable.user.name
            },
            slug: productTable.slug
        };
    }
    async createOne(input: productEntity): Promise<productWithUser> {
        const inputDb = productMapper.toPersistence(input);
        const created = await prisma.product.create({
            data: inputDb,
            include: {
                user: {
                    select: {   
                        id: true,
                        name: true
                    }
                }
            }
        });

        return {
            product: productMapper.toDomain(created),
            user: {
                id: created.user.id,
                name: created.user.name
            },
            slug: created.slug
        };
    }
    async editOne(input: productEntity): Promise<productWithUser> {
        const inputDb = productMapper.toPersistence(input);
        const updated = await prisma.product.update({
            where: { id: input.getId() },
            data: inputDb,
            include: {
                user: {
                    select: { id: true, name: true }
                }
            }
        });
        return {
            product: productMapper.toDomain(updated),
            user: {
                id: updated.user.id,
                name: updated.user.name
            },
            slug: updated.slug
        };
    }
    
    async deleteOne(intput: productEntity): Promise<void> {
        
    }
}