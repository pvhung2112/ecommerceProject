import { userEntity } from "../../domain/entities/user.entity";

export class userMapper {
    public static toDomain(raw : any){
        return new userEntity(raw.id, raw.roleId, raw.email, raw.status);
    }
}