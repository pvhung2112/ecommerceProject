import { productInputDto } from "../../dtos/products/product.inputDto";
import { productOutputDto } from "../../dtos/products/product.outputDto";
import { IProductRepository } from "../../ports/repositories/iProduct.repository";
import { productEntity } from "../../../domain/entities/product.entity";

export class createOneproductusecase {
    constructor(private iProductRepository: IProductRepository) {}

    async execute(input: productInputDto): Promise<productOutputDto> {
        if (!input.userId) {
            throw new Error("Không tìm thấy thông tin người dùng (userId)!");
        }
        const newProduct = new productEntity("", input.name, input.price, input.userId);
        const created = await this.iProductRepository.createOne(newProduct);

        return {
            name: created.product.getName(),
            price: created.product.getPrice(),
            slug: created.slug,
            user: {
                id: created.user.id,
                name: created.user.name,
            }
        };
    }
}
