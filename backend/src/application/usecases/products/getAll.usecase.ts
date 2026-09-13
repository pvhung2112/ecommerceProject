import { productOutputDto } from "../../ports/dto/products/product.outputDto";
import { IProductRepository } from "../../ports/repositories/iProduct.repository";
import { IUsecase } from "../index.usecase";

export class getAllproductusecase implements IUsecase<void, productOutputDto[]> {

    constructor(private iProductRepository: IProductRepository) { }
    async execute(): Promise<productOutputDto[]> {
        const item = await this.iProductRepository.getAll();
        console.log(item);
        return item.map((item) => {
            return {
                name: item.product.getName(),
                price: item.product.getPrice(),
                user : {
                    id : item.user.id,
                    name: item.user.name,
                }
            }
        })
    }
}