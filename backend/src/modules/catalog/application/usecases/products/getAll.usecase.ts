import { productOutputDto } from "../../dtos/products/product.outputDto";
import { IProductRepository } from "../../ports/repositories/iProduct.repository";

export class getAllproductusecase {
    constructor(private iProductRepository: IProductRepository) {}

    async execute(): Promise<productOutputDto[]> {
        const item = await this.iProductRepository.getAll();
        return item.map((item) => {
            return {
                id: item.product.getId(),
                name: item.product.getName(),
                price: item.product.getPrice(),
                originalPrice: item.product.getOriginalPrice() ?? null,
                slug: item.slug ?? null,
                description: item.product.getDescription() ?? null,
                thumbnail: item.product.getThumbnail() ?? null,
                images: item.product.getImages() ?? [],
                stock: item.product.getStock(),
                status: item.product.getStatus(),
                categoryId: item.product.getCategoryId() ?? null,
                user: {
                    id: item.user.id,
                    name: item.user.name,
                }
            };
        });
    }
}
