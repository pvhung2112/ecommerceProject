import { ICategoryRepository } from "../../ports/repositories/iCategory.repository";
import { categoryOutputDto } from "../../ports/dto/categories/category.outputDto";

export class getDetailCategoryUsecase {
    constructor(private iCategoryRepository: ICategoryRepository) {}

    async execute(id: string): Promise<categoryOutputDto | null> {
        const item = await this.iCategoryRepository.getDetail(id);
        if (!item) {
            return null;
        }

        return {
            id: item.category.getId(),
            title: item.category.getTitle(),
            slug: item.slug,
            description: item.category.getDescription(),
            parentId: item.category.getParentId(),
            status: item.category.getStatus(),
            parent: item.parent
        };
    }
}
