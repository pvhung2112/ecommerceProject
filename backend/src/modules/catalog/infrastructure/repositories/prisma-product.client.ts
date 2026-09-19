import { IProductRepository } from "../../application/ports/repositories/iProduct.repository";
import { productWithUser } from "../../application/types/product.type";
import { productEntity } from "../../domain/entities/product.entity";
import { productMapper } from "../mappers/product.mapper";
import { prisma } from "../../../../shared/database/prisma.client";

export class productRepository implements IProductRepository {
    async getAll(): Promise<productWithUser[]> {
        const productTable = await prisma.product.findMany({
            include: {
                user: {
                    select: {
                        id: true,
                        profile: {
                            select: {
                                fullName: true
                            }
                        }
                    }
                }
            }
        });
        return productTable.map((item: any) => {
            return {
                product: productMapper.toDomain(item),
                user: {
                    id: item.user?.id ?? "",
                    name: item.user?.profile?.fullName ?? ""
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
                        profile: {
                            select: {
                                fullName: true
                            }
                        }
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
                id: productTable.user?.id ?? "",
                name: productTable.user?.profile?.fullName ?? ""
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
                        profile: {
                            select: {
                                fullName: true
                            }
                        }
                    }
                }
            }
        });

        return {
            product: productMapper.toDomain(created),
            user: {
                id: created.user?.id ?? "",
                name: created.user?.profile?.fullName ?? ""
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
                    select: {
                        id: true,
                        profile: {
                            select: {
                                fullName: true
                            }
                        }
                    }
                }
            }
        });
        return {
            product: productMapper.toDomain(updated),
            user: {
                id: updated.user?.id ?? "",
                name: updated.user?.profile?.fullName ?? ""
            },
            slug: updated.slug
        };
    }

    async deleteOne(intput: productEntity): Promise<void> {}
}
