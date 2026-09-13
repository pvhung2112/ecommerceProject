import slugify from "slugify";
import { productEntity } from "../../domain/entities/product.entity";

export class productMapper {
    public static toPersistence(item: productEntity) { // entity -> db
        const baseSlug = slugify(item.getName(), { lower: true, locale: "vi", strict: true });
        return {
            name: item.getName(),
            slug: baseSlug,
            price: item.getPrice(),
            userId: item.getUserId()
        };
    }

    public static toDomain(raw: any): productEntity {
        return new productEntity(raw.id, raw.name, Number(raw.price), raw.userId);
    }
}