import slugify from "slugify";
import { categoryEntity } from "../../domain/entities/category.entity";

export class categoryMapper {
    public static toPersistence(item: categoryEntity) {
        const baseSlug = slugify(item.getTitle(), { lower: true, locale: "vi", strict: true });
        return {
            title: item.getTitle(),
            slug: baseSlug,
            parentId: item.getParentId() || null,
            status: item.getStatus(),
            description: item.getDescription() || null
        };
    }

    public static toDomain(raw: any): categoryEntity {
        return new categoryEntity(
            raw.id,
            raw.title,
            raw.parentId,
            raw.status,
            raw.description
        );
    }
}
