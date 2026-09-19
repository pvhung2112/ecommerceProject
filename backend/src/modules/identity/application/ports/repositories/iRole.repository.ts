import { roleEntity } from "../../../domain/entities/role.entity";

export interface IRoleRepository {
    getAll(): Promise<roleEntity[]>;
    getDetail(id : string) : Promise<roleEntity>;
    createOne(input : roleEntity) : Promise<roleEntity>;
    updateOne(input : roleEntity) : Promise<roleEntity>;
    updateMulti(input : roleEntity[]) : Promise<roleEntity[]>;
    deleteOne(input : string) : Promise<void>;
}
