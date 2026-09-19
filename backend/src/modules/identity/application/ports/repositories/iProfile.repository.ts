import { profileEntity } from "../../../domain/entities/profile.entity";

export interface IProfileRepository {
    getAll(): Promise<profileEntity[]>;
    getDetail(id: string): Promise<profileEntity>;
    getByUserId(userId: string): Promise<profileEntity | null>;
    createOne(input: profileEntity): Promise<profileEntity>;
    updateOne(input: profileEntity): Promise<profileEntity>;
    deleteOne(id: string): Promise<void>;
}
