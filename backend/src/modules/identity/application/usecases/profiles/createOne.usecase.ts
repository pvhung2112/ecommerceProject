import { IProfileRepository } from "../../ports/repositories/iProfile.repository";
import { profileInputDto } from "../../dtos/profiles/profile.inputDto";
import { profileOutputDto } from "../../dtos/profiles/profile.outputDto";
import { profileEntity } from "../../../domain/entities/profile.entity";

export class createOneProfileUsecase {
    constructor(private iProfileRepository: IProfileRepository) {}

    async execute(input: profileInputDto): Promise<profileOutputDto> {
        const existingProfile = await this.iProfileRepository.getByUserId(input.userId);
        if (existingProfile) {
            throw new Error("Người dùng này đã có hồ sơ cá nhân");
        }

        const birthday = input.birthday ? new Date(input.birthday) : undefined;
        const itemNew = new profileEntity(
            input.id || "",
            input.fullName,
            input.userId,
            input.phone,
            input.address,
            input.gender,
            birthday,
            input.bio
        );

        const item = await this.iProfileRepository.createOne(itemNew);
        return {
            id: item.getId(),
            userId: item.getUserId(),
            fullName: item.getFullName(),
            phone: item.getPhone(),
            address: item.getAddress(),
            gender: item.getGender(),
            birthday: item.getBirthday(),
            bio: item.getBio()
        };
    }
}
