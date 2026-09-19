import { roleEntity } from "../../domain/entities/role.entity";

export class roleMapper{
    public static toDomain(raw : any){
        return new roleEntity(raw.id, raw.name, raw.description);
    }
    public static toPersistence(input : roleEntity){
        return {
            id : input.getId(),
            name : input.getName(),
            description : input.getDescription()
        }
    }
}