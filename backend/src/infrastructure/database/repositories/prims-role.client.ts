import { IRoleRepository } from "../../../application/ports/repositories/iRole.repository";
import { roleEntity } from "../../../domain/entities/role.entity";
import { prisma } from "../prisma.client";
export class roleRepository implements IRoleRepository {
    async getAll(): Promise<roleEntity[]> {
        const roleTable = await prisma.role.findMany();
        return roleTable.map((item :any)=>{
            return new roleEntity(item.id, item.name, item.description);
        })
    }  }