import { IRoleRepository } from "../../ports/repositories/iRole.repository";
import { roleOutputDto } from "../../dtos/roles/role.outputDto";
import { roleInputDto } from "../../dtos/roles/role.inputDto";
import { roleEntity } from "../../../domain/entities/role.entity";
export class updateMultiroleusecase{
constructor(private iRoleRepository : IRoleRepository){}
       async execute(input : roleInputDto[]): Promise<roleOutputDto[]>{
        const itemMapper = input.map((item)=>{
            if(!item.id) {
                throw new Error("Không tìm thấy id");
            }
            return new roleEntity(item.id,item.name,item.description);
        })
        const item = await this.iRoleRepository.updateMulti(itemMapper);
        return item.map((item)=>{
            return {
                id : item.getId(),
                name : item.getName(),
                description : item.getDescription()
            }
        })
       }
}