import { roleEntity } from "../../../domain/entities/role.entity";
import { userEntity } from "../../../domain/entities/user.entity";
import { profileEntity } from "../../../domain/entities/profile.entity";
import { accountEntity } from "../../../domain/entities/account.entity";
import { authPayload, loginInputDto } from "../../dtos/auth/auth.inputDto";

export interface IAuthRepository {
    register(data: authPayload): Promise<{
        user: userEntity;
        role: roleEntity;
        profile: profileEntity;
        account: accountEntity;
    }>;
    findByEmail(email: string): Promise<{
        user: userEntity;
        role: roleEntity;
        profile: profileEntity;
        account: accountEntity;
    } | null>;
}

