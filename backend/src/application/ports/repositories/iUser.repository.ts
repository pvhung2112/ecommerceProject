import { userEntity } from "../../../domain/entities/user.entity";

export interface IUserRepository{
    getAll() : Promise<userEntity[]>;
}