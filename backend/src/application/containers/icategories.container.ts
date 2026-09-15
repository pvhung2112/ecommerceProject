import { createOneCategoryUsecase } from "../usecases/categories/createOne.usecase";
import { getAllCategoriesUsecase } from "../usecases/categories/getAll.usecase";
import { getDetailCategoryUsecase } from "../usecases/categories/getDetail.usecase";

export interface iCategoriesContainer {
    createOneCategoryUsecase: createOneCategoryUsecase;
    getAllCategoriesUsecase: getAllCategoriesUsecase;
    getDetailCategoryUsecase: getDetailCategoryUsecase;
}

