import { ICategoryRepository } from "../../ports/repositories/iCategory.repository";
import { categoryOutputDto } from "../../ports/dto/categories/category.outputDto";

export class getAllCategoriesUsecase {
    constructor(private iCategoryRepository: ICategoryRepository) {}

    async execute(): Promise<categoryOutputDto[]> {
        const categories = await this.iCategoryRepository.getAll();
        return categories.map((item) => ({
            id: item.category.getId(),
            title: item.category.getTitle(),
            slug: item.slug,
            description: item.category.getDescription(),
            parentId: item.category.getParentId(),
            status: item.category.getStatus(),
            parent: item.parent
        }));
    }
}
