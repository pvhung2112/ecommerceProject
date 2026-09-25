import { IAuthModule } from "../../application/modules/iauth.module";
import { authRepository } from "../repositories/prisma-auth.client";
import { roleRepository } from "../repositories/prisma-role.client";
import { registerUsecaseUserByEmail } from "../../application/usecases/auth/register.usecase";
import { LoginUserByEmail } from "../../application/usecases/auth/login.usecase";

export const authModule = (): IAuthModule => {
    const authRepo = new authRepository();
    const roleRepo = new roleRepository();

    return {
        registerByEmailUsecase: new registerUsecaseUserByEmail(authRepo, roleRepo),
        loginByEmailUsecase: new LoginUserByEmail(authRepo)
    };
};