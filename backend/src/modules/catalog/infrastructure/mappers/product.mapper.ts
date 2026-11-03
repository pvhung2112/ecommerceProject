import slugify from "slugify";
import { productEntity } from "../../domain/entities/product.entity";

export class productMapper {
    public static toPersistence(item: productEntity) {
        const baseSlug = slugify(item.getName(), { lower: true, locale: "vi", strict: true });
        return {
            name: item.getName(),
            slug: baseSlug,
            price: item.getPrice(),
            userId: item.getUserId(),
            description: item.getDescription() ?? null,
            thumbnail: item.getThumbnail() ?? null,
            images: item.getImages() ?? [],
            originalPrice: item.getOriginalPrice() ?? null,
            stock: item.getStock() ?? 0,
            status: item.getStatus() ?? "active",
            categoryId: item.getCategoryId() ?? null
        };
    }

    public static toDomain(raw: any): productEntity {
        return new productEntity(
            raw.id,
            raw.name,
            Number(raw.price),
            raw.userId,
            raw.description ?? undefined,
            raw.thumbnail ?? undefined,
            raw.images ?? [],
            raw.originalPrice ? Number(raw.originalPrice) : undefined,
            raw.stock ?? 0,
            raw.status ?? "active",
            raw.categoryId ?? undefined
        );
    }
}
