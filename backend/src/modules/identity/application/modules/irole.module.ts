import { getAllroleuseCase } from "../usecases/roles/getAll.usecase";
import { getDetailroleusecase } from "../usecases/roles/getDetail.usecase";
import { createOneroleusecase } from "../usecases/roles/createOne.usecase";
import { updateOneroleusecase } from "../usecases/roles/updateOne.usecase";
import { updateMultiroleusecase } from "../usecases/roles/updateMulti.usecase";

export interface IRoleModule {
    getAllRoleUsecase: getAllroleuseCase;
    getDetailroleusecase: getDetailroleusecase;
    createOneroleusecase: createOneroleusecase;
    updateOneroleusecase: updateOneroleusecase;
    updateMultiroleusecase: updateMultiroleusecase;
}