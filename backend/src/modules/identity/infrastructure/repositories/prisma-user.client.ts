import { IUserRepository } from "../../application/ports/repositories/iUser.repository";
import { userEntity } from "../../domain/entities/user.entity";
import { prisma } from "../../../../shared/infrastructure/database/prisma.client";

export class userRepository implements IUserRepository {
    async getAll(): Promise<userEntity[]> {
        const userTable = await prisma.user.findMany();
        return userTable.map((item: any) => {
            return new userEntity(item.id, item.roleId, item.email || undefined, item.status);
        });
    }
}
