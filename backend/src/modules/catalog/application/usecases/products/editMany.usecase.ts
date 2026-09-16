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
                item.setName(data.name);
                item.setPrice(Number(data.price));
                const updated = await this.iProductRepository.editOne(item);
                return {
                    name: updated.product.getName(),
                    price: updated.product.getPrice(),
                    slug: updated.slug,
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
