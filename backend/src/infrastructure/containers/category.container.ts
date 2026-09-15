import { categoryRepository } from "../database/repositories/prisma-category.client";
import { ICategoryRepository } from "../../application/ports/repositories/iCategory.repository";
import { createOneCategoryUsecase } from "../../application/usecases/categories/createOne.usecase";
import { getAllCategoriesUsecase } from "../../application/usecases/categories/getAll.usecase";
import { getDetailCategoryUsecase } from "../../application/usecases/categories/getDetail.usecase";
import { iCategoriesContainer } from "../../application/containers/icategories.container";

export const IContainerCategory = (): iCategoriesContainer => {
    const repositoryCategory: ICategoryRepository = new categoryRepository();
    return {
        createOneCategoryUsecase: new createOneCategoryUsecase(repositoryCategory),
        getAllCategoriesUsecase: new getAllCategoriesUsecase(repositoryCategory),
        getDetailCategoryUsecase: new getDetailCategoryUsecase(repositoryCategory)
    };
};

