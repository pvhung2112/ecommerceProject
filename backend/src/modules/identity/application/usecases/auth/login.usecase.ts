import { loginInputDto } from "../../dtos/auth/auth.inputDto";
import { authOutputDto } from "../../dtos/auth/auth.outputDto";
import { IAuthRepository } from "../../ports/repositories/iAuth.repository";
import { bcryptService} from "../../../../../shared/services/bcrypt.service";
import { jwtService } from "../../../../../shared/services/jwt.service";
export interface ILoginUsecaseUser<input, output>{
     execute(input : input) : Promise<output>;
}
export class LoginUserByEmail implements ILoginUsecaseUser<loginInputDto,authOutputDto>{
    constructor(private iAuthrepository : IAuthRepository){}
    async execute(input : loginInputDto) : Promise<authOutputDto>{
        const checkUser = await this.iAuthrepository.findByEmail(input.email);
        if(!checkUser){
            throw new Error('User not found');
        }
        const hashedPassword = checkUser.account.getPassword();
        if (!hashedPassword) {
            throw new Error('Tài khoản này chưa cài đặt mật khẩu');
        }
        const checkPassword = await bcryptService.compare(input.password, hashedPassword);
        if(!checkPassword){
            throw new Error('Password not match');
        }
        const tokenPayload = {
            userId: checkUser.user.getId(),
            email: checkUser.user.getEmail(),
            role: checkUser.role.getName()
        };
        const accessToken = jwtService.signAcessToken(tokenPayload);
        const refreshToken = jwtService.signRefreshToken(tokenPayload);
        return {
            id: checkUser.user.getId(),
            user: {
                id: checkUser.user.getId(),
                email: checkUser.user.getEmail(),
                roleId: checkUser.user.getRoleId(),
                status: checkUser.user.getStatus()
            },
            role: {
                id: checkUser.role.getId(),
                name: checkUser.role.getName()
            },
            profile: {
                id: checkUser.profile.getId(),
                userId: checkUser.profile.getUserId(),
                fullName: checkUser.profile.getFullName(),
                phone: checkUser.profile.getPhone()
            },
            account: {
                id: checkUser.account.getId(),
                provider: checkUser.account.getProvider(),
                userId: checkUser.account.getUserId()
            },
            token: {
                accessToken,
                refreshToken
            }
        };

    }
}