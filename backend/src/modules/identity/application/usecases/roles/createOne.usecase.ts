import { roleInputDto } from "../../dtos/roles/role.inputDto";
import { IRoleRepository } from "../../ports/repositories/iRole.repository";
import { roleOutputDto } from "../../dtos/roles/role.outputDto";
import { roleEntity } from "../../../domain/entities/role.entity";

export class createOneroleusecase{
   constructor(private iRoleRepository : IRoleRepository){}
       async execute(input : roleInputDto): Promise<roleOutputDto>{
        const itemNew = new roleEntity("",input.name,input.description);
            const item = await this.iRoleRepository.createOne(itemNew);
            return {
                id : item.getId(),
                name : item.getName(),
                description : item.getDescription()
            }
       }
}