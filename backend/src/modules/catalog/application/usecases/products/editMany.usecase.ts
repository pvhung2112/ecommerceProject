import { IProductRepository } from "../../ports/repositories/iProduct.repository";
import { productEditdto } from "../../dtos/products/product.inputDto";
import { productOutputDto } from "../../dtos/products/product.outputDto";

export class editMultiproductusecase {
    constructor(private iProductRepository: IProductRepository) {}

    async execute(input: productEditdto[]): Promise<productOutputDto[]> {
        const getProducts = await Promise.all(
            input.map(async ({ id, data }) => {
                const getProductbyid = await this.iProductRepository.getDetail(id);
                if (!getProductbyid) {
                    throw new Error(`Không tìm thấy sản phẩm với id: ${id}`);
                }
                const item = getProductbyid.product;
                if (data.name !== undefined) item.setName(data.name);
                if (data.price !== undefined) item.setPrice(Number(data.price));
                if (data.description !== undefined) item.setDescription(data.description);
                if (data.thumbnail !== undefined) item.setThumbnail(data.thumbnail);
                if (data.images !== undefined) item.setImages(data.images);
                if (data.originalPrice !== undefined) item.setOriginalPrice(data.originalPrice);
                if (data.stock !== undefined) item.setStock(data.stock);
                if (data.status !== undefined) item.setStatus(data.status);
                if (data.categoryId !== undefined) item.setCategoryId(data.categoryId);

                const updated = await this.iProductRepository.editOne(item);
                return {
                    id: updated.product.getId(),
                    name: updated.product.getName(),
                    price: updated.product.getPrice(),
                    originalPrice: updated.product.getOriginalPrice() ?? null,
                    slug: updated.slug ?? null,
                    description: updated.product.getDescription() ?? null,
                    thumbnail: updated.product.getThumbnail() ?? null,
                    images: updated.product.getImages() ?? [],
                    stock: updated.product.getStock(),
                    status: updated.product.getStatus(),
                    categoryId: updated.product.getCategoryId() ?? null,
                    user: {
                        id: updated.user.id,
                        name: updated.user.name,
                    }
                };
            })
        );
        return getProducts;
    }
}
