import { IRoleRepository } from "../../ports/repositories/iRole.repository";
import { roleOutputDto } from "../../dtos/roles/role.outputDto";
export class getDetailroleusecase{
    constructor(private iRoleRepository : IRoleRepository){}
    async execute(id : string) : Promise<roleOutputDto>{
        const output = await this.iRoleRepository.getDetail(id);
        return {
            id: output.getId(),
            name: output.getName(),
            description: output.getDescription()
        }
    }
}