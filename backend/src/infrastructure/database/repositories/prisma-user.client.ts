import { IUserRepository } from "../../../application/ports/repositories/iUser.repository";
import { userEntity } from "../../../domain/entities/user.entity";
import { prisma } from "../prisma.client";

export class userRepository implements IUserRepository{
    async getAll(): Promise<userEntity[]> {
        const userTable = await prisma.user.findMany();
        console.log(userTable);
        return userTable.map((item :any)=>{
            return new userEntity(item.id, item.name, item.email, item.roleId,item.password);
        });
    }
}
    
