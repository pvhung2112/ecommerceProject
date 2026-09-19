import { IRoleRepository } from "../../ports/repositories/iRole.repository";
import { roleOutputDto } from "../../dtos/roles/role.outputDto";

export class getAllroleuseCase{
    constructor(private iRoleRepository : IRoleRepository){}
    async execute(): Promise<roleOutputDto[]>{
        const output = await this.iRoleRepository.getAll();
        return output.map((item) => {
            return {
                id: item.getId(),
                name: item.getName(),
                description: item.getDescription()
            };
        });
    }
}