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
        product.setName(input.name);
        product.setPrice(input.price);
        const updatedProduct = await this.iProductRepository.editOne(product);
        return {
            name: updatedProduct.product.getName(),
            price: updatedProduct.product.getPrice(),
            slug: updatedProduct.slug,
            user: {
                id: updatedProduct.user.id,
                name: updatedProduct.user.name,
            }
        };
    }
}
