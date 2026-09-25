import { registerUsecaseUserByEmail } from "../usecases/auth/register.usecase";
import { LoginUserByEmail } from "../usecases/auth/login.usecase";

export interface IAuthModule {
    registerByEmailUsecase: registerUsecaseUserByEmail;
    loginByEmailUsecase: LoginUserByEmail;
    
}
