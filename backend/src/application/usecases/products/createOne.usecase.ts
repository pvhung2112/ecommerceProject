import { productInputDto } from "../../ports/dto/products/product.inputDto";
import { productOutputDto } from "../../ports/dto/products/product.outputDto";
import { IProductRepository } from "../../ports/repositories/iProduct.repository";
import { productEntity } from "../../../domain/entities/product.entity";
export class createOneproductusecase {
  constructor(private iProductRepository: IProductRepository) { }
  async execute(input: productInputDto): Promise<productOutputDto> {
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