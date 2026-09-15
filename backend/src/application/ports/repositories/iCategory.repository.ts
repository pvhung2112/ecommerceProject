import { categoryEntity } from "../../../domain/entities/category.entity";
import { categoryWithType } from "../type/category.type";

export interface ICategoryRepository {
    createOne(input: categoryEntity): Promise<categoryWithType>;
    getAll(): Promise<categoryWithType[]>;
    getDetail(id: string): Promise<categoryWithType | null>;
}
