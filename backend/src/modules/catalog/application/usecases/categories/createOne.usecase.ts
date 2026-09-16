import { ICategoryRepository } from "../../ports/repositories/iCategory.repository";
import { categoryInputDto } from "../../dtos/categories/category.inputDto";
import { categoryOutputDto } from "../../dtos/categories/category.outputDto";
import { categoryEntity } from "../../../domain/entities/category.entity";

export class createOneCategoryUsecase {
    constructor(private iCategoryRepository: ICategoryRepository) {}

    async execute(dto: categoryInputDto): Promise<categoryOutputDto> {
        const category = new categoryEntity("", dto.title, dto.parentId, dto.status || "active", dto.description);

        const result = await this.iCategoryRepository.createOne(category);

        return {
            id: result.category.getId(),
            title: result.category.getTitle(),
            slug: result.slug,
            description: result.category.getDescription(),
            parentId: result.category.getParentId(),
            status: result.category.getStatus(),
        };
    }
}
