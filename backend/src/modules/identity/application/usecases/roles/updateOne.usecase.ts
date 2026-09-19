import { IRoleRepository } from "../../ports/repositories/iRole.repository";
import { roleInputDto } from "../../dtos/roles/role.inputDto";
import { roleOutputDto } from "../../dtos/roles/role.outputDto";


export class updateOneroleusecase {
    constructor(private iRoleRepository: IRoleRepository) {}

    async execute(input: roleInputDto, id: string): Promise<roleOutputDto> {
        const getItem = await this.iRoleRepository.getDetail(id);
        getItem.setName(input.name);
        getItem.setDescription(input.description);

        const item = await this.iRoleRepository.updateOne(getItem);
        return {
            id: item.getId(),
            name: item.getName(),
            description: item.getDescription()
        };
    }
}