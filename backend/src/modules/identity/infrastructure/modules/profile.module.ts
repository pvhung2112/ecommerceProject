import { profileRepository } from "../repositories/prisma-profile.client";
import { IProfileModule } from "../../application/modules/iprofile.module";
import { getAllProfileUsecase } from "../../application/usecases/profiles/getAll.usecase";
import { getDetailProfileUsecase } from "../../application/usecases/profiles/getDetail.usecase";
import { getByUserIdProfileUsecase } from "../../application/usecases/profiles/getByUserId.usecase";
import { createOneProfileUsecase } from "../../application/usecases/profiles/createOne.usecase";
import { updateOneProfileUsecase } from "../../application/usecases/profiles/updateOne.usecase";

export const profileModule = (): IProfileModule => {
    const repository = new profileRepository();
    return {
        getAllProfileUsecase: new getAllProfileUsecase(repository),
        getDetailProfileUsecase: new getDetailProfileUsecase(repository),
        getByUserIdProfileUsecase: new getByUserIdProfileUsecase(repository),
        createOneProfileUsecase: new createOneProfileUsecase(repository),
        updateOneProfileUsecase: new updateOneProfileUsecase(repository)
    };
};
