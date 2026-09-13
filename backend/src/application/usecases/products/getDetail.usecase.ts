import { productOutputDto } from "../../ports/dto/products/product.outputDto";
import { IProductRepository } from "../../ports/repositories/iProduct.repository";
export class getDetailproductusecase {
     constructor(private iProductRepository: IProductRepository) { }
     async execute(input : string) : Promise<productOutputDto | null>{
        const item = await this.iProductRepository.getDetail(input);
        console.log(item);
        if (!item) {
            return null;
        }
        return {
            name: item.product.getName(),
            price: item.product.getPrice(),
            slug: item.slug,
            user: {
                id: item.user.id,
                name: item.user.name,
            }
        };
     }
}