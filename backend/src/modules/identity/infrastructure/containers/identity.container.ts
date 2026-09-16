import { userRepository } from "../repositories/prisma-user.client";
import { roleRepository } from "../repositories/prisma-role.client";
import { IUserRepository } from "../../application/ports/repositories/iUser.repository";
import { IRoleRepository } from "../../application/ports/repositories/iRole.repository";

export interface IIdentityContainer {
    userRepository: IUserRepository;
    roleRepository: IRoleRepository;
}

export const identityContainer = (): IIdentityContainer => {
    return {
        userRepository: new userRepository(),
        roleRepository: new roleRepository()
    };
};
