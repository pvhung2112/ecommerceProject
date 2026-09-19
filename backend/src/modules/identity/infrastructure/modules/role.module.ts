import { roleRepository } from "../repositories/prisma-role.client";
import { IRoleModule } from "../../application/modules/irole.module";
import { getAllroleuseCase } from "../../application/usecases/roles/getAll.usecase";
import { getDetailroleusecase } from "../../application/usecases/roles/getDetail.usecase";
import { createOneroleusecase } from "../../application/usecases/roles/createOne.usecase";
import { updateOneroleusecase } from "../../application/usecases/roles/updateOne.usecase";
import { updateMultiroleusecase } from "../../application/usecases/roles/updateMulti.usecase";

export const roleModule = (): IRoleModule => {
    const repository = new roleRepository();
    return {
        getAllRoleUsecase: new getAllroleuseCase(repository),
        getDetailroleusecase: new getDetailroleusecase(repository),
        createOneroleusecase: new createOneroleusecase(repository),
        updateOneroleusecase: new updateOneroleusecase(repository),
        updateMultiroleusecase: new updateMultiroleusecase(repository)
    };
};