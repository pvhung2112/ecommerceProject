import { categoryRepository } from "../repositories/prisma-category.client";
import { ICategoryRepository } from "../../application/ports/repositories/iCategory.repository";
import { createOneCategoryUsecase } from "../../application/usecases/categories/createOne.usecase";
import { getAllCategoriesUsecase } from "../../application/usecases/categories/getAll.usecase";
import { getDetailCategoryUsecase } from "../../application/usecases/categories/getDetail.usecase";
import { ICategoryModule } from "../../application/modules/icategory.module";

export const initCategoryModule = (): ICategoryModule => {
    const repositoryCategory: ICategoryRepository = new categoryRepository();
    return {
        createOneCategoryUsecase: new createOneCategoryUsecase(repositoryCategory),
        getAllCategoriesUsecase: new getAllCategoriesUsecase(repositoryCategory),
        getDetailCategoryUsecase: new getDetailCategoryUsecase(repositoryCategory)
    };
};
