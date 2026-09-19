import { IRoleRepository } from "../../application/ports/repositories/iRole.repository";
import { roleEntity } from "../../domain/entities/role.entity";
import { prisma } from "../../../../shared/database/prisma.client";
import { roleMapper } from "../mappers/role.mapper";

export class roleRepository implements IRoleRepository {
    async getAll(): Promise<roleEntity[]> {
        const roleTable = await prisma.role.findMany();
        return roleTable.map((item: any) => {
            return new roleEntity(item.id, item.name, item.description);
        });
    }
    async getDetail(id: string): Promise<roleEntity> {
        const roleTable  = await prisma.role.findUnique({
            where : {id}
        });
        if(!roleTable){
            throw new Error("role not found");
        }
        return new roleEntity(roleTable.id, roleTable.name, roleTable?.description ?? undefined);
    }

    async createOne(output: roleEntity): Promise<roleEntity> {
        const inputDb = roleMapper.toPersistence(output);
        const item = await prisma.role.create({
            data : inputDb
        })
        return roleMapper.toDomain(item);
    }
    async updateOne(input: roleEntity): Promise<roleEntity> {
        const inputDb = roleMapper.toPersistence(input);
        const item = await prisma.role.update({
            where : {id : input.getId()},
            data : inputDb
        })
        return roleMapper.toDomain(item);
    }
    async updateMulti(input: roleEntity[]): Promise<roleEntity[]> {
          const output = await Promise.all(
        input.map(async (item) => {
            const mapperDb = roleMapper.toPersistence(item);
            const updatedItem = await prisma.role.update({
                where: { id: item.getId() },
                data: mapperDb
            });
            return roleMapper.toDomain(updatedItem);
        })
    );
    return output;
    }
    async deleteOne(input: string): Promise<void> {
        
    }
}
