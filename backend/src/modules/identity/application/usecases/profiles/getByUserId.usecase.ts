import { IProfileRepository } from "../../ports/repositories/iProfile.repository";
import { profileOutputDto } from "../../dtos/profiles/profile.outputDto";

export class getByUserIdProfileUsecase {
    constructor(private iProfileRepository: IProfileRepository) {}

    async execute(userId: string): Promise<profileOutputDto | null> {
        const item = await this.iProfileRepository.getByUserId(userId);
        if (!item) {
            return null;
        }
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
