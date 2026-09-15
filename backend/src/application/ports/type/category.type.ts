import { categoryEntity } from "../../../domain/entities/category.entity";

export interface categoryWithType {
    category: categoryEntity;
    slug?: string | null;
    parent?: {
        id: string;
        title: string;
    } | null;
}
