import { registerInputDto } from "../../dtos/auth/auth.inputDto";
import { authOutputDto } from "../../dtos/auth/auth.outputDto";
import { IAuthRepository } from "../../ports/repositories/iAuth.repository";
import { IRoleRepository } from "../../ports/repositories/iRole.repository";
import { bcryptService } from "../../../../../shared/services/auth/bcrypt.service";
import { authPayload } from "../../dtos/auth/auth.inputDto";
export interface IRegisterUsecaseUser<input, output> {
    execute(input: input): Promise<output>;
}
export class registerUsecaseUserByEmail implements IRegisterUsecaseUser<registerInputDto, authOutputDto> {
    constructor(private iAuthrepository: IAuthRepository,
        private iRoleRepository: IRoleRepository
    ) {

    }
    async execute(input: registerInputDto): Promise<authOutputDto> {
        const getRoles = await this.iRoleRepository.getAll();
        const getRoleCustomer = getRoles.find((item) => {
            return item.getName() === "CUSTOMER"
        })
        const hashedPassword = await bcryptService.hash(input.password);
        const payload: authPayload = {
            provider: 'local',
            providerAccountId: input.email,
            email: input.email,
            password: hashedPassword,
            fullName: input.fullName,
            roleId: getRoleCustomer!.getId()
        };
        const result = await this.iAuthrepository.register(payload);
        return {
            id: result.user.getId(),
            user: {
                id: result.user.getId(),
                email: result.user.getEmail(),
                roleId: result.user.getRoleId(),
                status: result.user.getStatus()
            },
            role: {
                id: result.role.getId(),
                name: result.role.getName()
            },
            profile: {
                id: result.profile.getId(),
                userId: result.profile.getUserId(),
                fullName: result.profile.getFullName(),
                phone: result.profile.getPhone()
            },
            account: {
                id: result.account.getId(),
                provider: result.account.getProvider(),
                userId: result.account.getUserId()
            }
        };



    }
}
