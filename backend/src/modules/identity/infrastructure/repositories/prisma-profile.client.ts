import { IProfileRepository } from "../../application/ports/repositories/iProfile.repository";
import { profileEntity } from "../../domain/entities/profile.entity";
import { prisma } from "../../../../shared/database/prisma.client";
import { profileMapper } from "../mappers/profile.mapper";

export class profileRepository implements IProfileRepository {
    async getAll(): Promise<profileEntity[]> {
        const profileTable = await prisma.profile.findMany();
        return profileTable.map((item: any) => profileMapper.toDomain(item));
    }

    async getDetail(id: string): Promise<profileEntity> {
        const profileTable = await prisma.profile.findUnique({
            where: { id }
        });
        if (!profileTable) {
            throw new Error("Không tìm thấy hồ sơ cá nhân");
        }
        return profileMapper.toDomain(profileTable);
    }

    async getByUserId(userId: string): Promise<profileEntity | null> {
        const profileTable = await prisma.profile.findUnique({
            where: { userId }
        });
        if (!profileTable) {
            return null;
        }
        return profileMapper.toDomain(profileTable);
    }

    async createOne(input: profileEntity): Promise<profileEntity> {
        const inputDb = profileMapper.toPersistence(input);
        const item = await prisma.profile.create({
            data: {
                fullName: inputDb.fullName,
                userId: inputDb.userId,
                phone: inputDb.phone,
                address: inputDb.address,
                gender: inputDb.gender,
                birthday: inputDb.birthday,
                bio: inputDb.bio
            }
        });
        return profileMapper.toDomain(item);
    }

    async updateOne(input: profileEntity): Promise<profileEntity> {
        const inputDb = profileMapper.toPersistence(input);
        const item = await prisma.profile.update({
            where: { id: input.getId() },
            data: {
                fullName: inputDb.fullName,
                phone: inputDb.phone,
                address: inputDb.address,
                gender: inputDb.gender,
                birthday: inputDb.birthday,
                bio: inputDb.bio
            }
        });
        return profileMapper.toDomain(item);
    }

    async deleteOne(id: string): Promise<void> {
        await prisma.profile.delete({
            where: { id }
        });
    }
}
