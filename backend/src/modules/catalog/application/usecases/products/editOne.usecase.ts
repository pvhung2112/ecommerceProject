import { productInputDto } from "../../dtos/products/product.inputDto";
import { productOutputDto } from "../../dtos/products/product.outputDto";
import { IProductRepository } from "../../ports/repositories/iProduct.repository";

export class editOneproductusecase {
    constructor(private iProductRepository: IProductRepository) {}

    async execute(input: productInputDto, id: string): Promise<productOutputDto> {
        const item = await this.iProductRepository.getDetail(id);
        if (!item) {
            throw new Error("Không tìm thấy sản phẩm để sửa!");
        }
        const product = item.product;
        if (input.name !== undefined) product.setName(input.name);
        if (input.price !== undefined) product.setPrice(input.price);
        if (input.description !== undefined) product.setDescription(input.description);
        if (input.thumbnail !== undefined) product.setThumbnail(input.thumbnail);
        if (input.images !== undefined) product.setImages(input.images);
        if (input.originalPrice !== undefined) product.setOriginalPrice(input.originalPrice);
        if (input.stock !== undefined) product.setStock(input.stock);
        if (input.status !== undefined) product.setStatus(input.status);
        if (input.categoryId !== undefined) product.setCategoryId(input.categoryId);

        const updatedProduct = await this.iProductRepository.editOne(product);
        return {
            id: updatedProduct.product.getId(),
            name: updatedProduct.product.getName(),
            price: updatedProduct.product.getPrice(),
            originalPrice: updatedProduct.product.getOriginalPrice() ?? null,
            slug: updatedProduct.slug ?? null,
            description: updatedProduct.product.getDescription() ?? null,
            thumbnail: updatedProduct.product.getThumbnail() ?? null,
            images: updatedProduct.product.getImages() ?? [],
            stock: updatedProduct.product.getStock(),
            status: updatedProduct.product.getStatus(),
            categoryId: updatedProduct.product.getCategoryId() ?? null,
            user: {
                id: updatedProduct.user.id,
                name: updatedProduct.user.name,
            }
        };
    }
}
