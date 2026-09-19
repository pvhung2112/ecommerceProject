import { ICategoryRepository } from "../../application/ports/repositories/iCategory.repository";
import { categoryWithType } from "../../application/types/category.type";
import { categoryEntity } from "../../domain/entities/category.entity";
import { categoryMapper } from "../mappers/category.mapper";
import { prisma } from "../../../../shared/database/prisma.client";

export class categoryRepository implements ICategoryRepository {
    async createOne(input: categoryEntity): Promise<categoryWithType> {
        const inputDb = categoryMapper.toPersistence(input);
        const created = await prisma.category.create({
            data: inputDb,
            include: {
                parent: {
                    select: {
                        id: true,
                        title: true
                    }
                }
            }
        });

        return {
            category: categoryMapper.toDomain(created),
            slug: created.slug,
            parent: created.parent ? { id: created.parent.id, title: created.parent.title } : null
        };
    }

    async getAll(): Promise<categoryWithType[]> {
        const categories = await prisma.category.findMany({
            where: { deleted: false },
            include: {
                parent: {
                    select: {
                        id: true,
                        title: true
                    }
                }
            }
        });

        return categories.map((item: any) => ({
            category: categoryMapper.toDomain(item),
            slug: item.slug,
            parent: item.parent ? { id: item.parent.id, title: item.parent.title } : null
        }));
    }

    async getDetail(id: string): Promise<categoryWithType | null> {
        const item = await prisma.category.findUnique({
            where: { id },
            include: {
                parent: {
                    select: {
                        id: true,
                        title: true
                    }
                }
            }
        });

        if (!item || item.deleted) {
            return null;
        }

        return {
            category: categoryMapper.toDomain(item),
            slug: item.slug,
            parent: item.parent ? { id: item.parent.id, title: item.parent.title } : null
        };
    }
}
