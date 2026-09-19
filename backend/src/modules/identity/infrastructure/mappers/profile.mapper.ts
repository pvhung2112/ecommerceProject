import { profileEntity } from "../../domain/entities/profile.entity";

export class profileMapper {
    public static toDomain(raw: any): profileEntity {
        return new profileEntity(
            raw.id,
            raw.fullName,
            raw.userId,
            raw.phone ?? undefined,
            raw.address ?? undefined,
            raw.gender ?? undefined,
            raw.birthday ? new Date(raw.birthday) : undefined,
            raw.bio ?? undefined
        );
    }

    public static toPersistence(input: profileEntity) {
        return {
            id: input.getId() || undefined,
            fullName: input.getFullName(),
            userId: input.getUserId(),
            phone: input.getPhone() ?? null,
            address: input.getAddress() ?? null,
            gender: input.getGender() ?? null,
            birthday: input.getBirthday() ?? null,
            bio: input.getBio() ?? null
        };
    }
}
