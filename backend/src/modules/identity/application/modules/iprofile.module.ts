import { getAllProfileUsecase } from "../usecases/profiles/getAll.usecase";
import { getDetailProfileUsecase } from "../usecases/profiles/getDetail.usecase";
import { getByUserIdProfileUsecase } from "../usecases/profiles/getByUserId.usecase";
import { createOneProfileUsecase } from "../usecases/profiles/createOne.usecase";
import { updateOneProfileUsecase } from "../usecases/profiles/updateOne.usecase";

export interface IProfileModule {
    getAllProfileUsecase: getAllProfileUsecase;
    getDetailProfileUsecase: getDetailProfileUsecase;
    getByUserIdProfileUsecase: getByUserIdProfileUsecase;
    createOneProfileUsecase: createOneProfileUsecase;
    updateOneProfileUsecase: updateOneProfileUsecase;
}
