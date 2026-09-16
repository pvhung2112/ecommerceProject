import { roleEntity } from "../../../domain/entities/role.entity";

export interface IRoleRepository {
    getAll(): Promise<roleEntity[]>;
}
