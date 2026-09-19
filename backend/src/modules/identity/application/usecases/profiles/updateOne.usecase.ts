import { IProfileRepository } from "../../ports/repositories/iProfile.repository";
import { profileUpdateInputDto } from "../../dtos/profiles/profile.inputDto";
import { profileOutputDto } from "../../dtos/profiles/profile.outputDto";

export class updateOneProfileUsecase {
    constructor(private iProfileRepository: IProfileRepository) {}

    async execute(input: profileUpdateInputDto, id: string): Promise<profileOutputDto> {
        const item = await this.iProfileRepository.getDetail(id);

        if (input.fullName !== undefined) item.setFullName(input.fullName);
        if (input.phone !== undefined) item.setPhone(input.phone);
        if (input.address !== undefined) item.setAddress(input.address);
        if (input.gender !== undefined) item.setGender(input.gender);
        if (input.birthday !== undefined) {
            item.setBirthday(input.birthday ? new Date(input.birthday) : undefined);
        }
        if (input.bio !== undefined) item.setBio(input.bio);

        const updated = await this.iProfileRepository.updateOne(item);
        return {
            id: updated.getId(),
            userId: updated.getUserId(),
            fullName: updated.getFullName(),
            phone: updated.getPhone(),
            address: updated.getAddress(),
            gender: updated.getGender(),
            birthday: updated.getBirthday(),
            bio: updated.getBio()
        };
    }
}
