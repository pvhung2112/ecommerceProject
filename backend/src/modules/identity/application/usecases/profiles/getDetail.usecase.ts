import { IProfileRepository } from "../../ports/repositories/iProfile.repository";
import { profileOutputDto } from "../../dtos/profiles/profile.outputDto";

export class getDetailProfileUsecase {
    constructor(private iProfileRepository: IProfileRepository) {}

    async execute(id: string): Promise<profileOutputDto> {
        const item = await this.iProfileRepository.getDetail(id);
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
