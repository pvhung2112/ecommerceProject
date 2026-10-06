import { productOutputDto } from "../../dtos/products/product.outputDto";
import { IProductRepository } from "../../ports/repositories/iProduct.repository";

export class getAllproductusecase {
    constructor(private iProductRepository: IProductRepository) {}

    async execute(): Promise<productOutputDto[]> {
        const item = await this.iProductRepository.getAll();
        return item.map((item ) => {
            return {
                id : item.product.getId(),
                name: item.product.getName(),
                price: item.product.getPrice(),
                slug: item.slug,
                user: {
                    id: item.user.id,
                    name: item.user.name,
                }
            };
        });
    }
}
