import { Request, Response } from "express";
import { profileInputDto, profileUpdateInputDto } from "../../application/dtos/profiles/profile.inputDto";
import { IIdentityModule } from "../../application/modules/iidentity.module";

export class profileController {
    constructor(private dependencies: IIdentityModule) {}

    getAll = async (_req: Request, res: Response): Promise<void> => {
        try {
            const output = await this.dependencies.profile.getAllProfileUsecase.execute();
            res.status(200).json({
                message: "Lấy danh sách hồ sơ thành công",
                data: output
            });
        } catch (error: any) {
            res.status(500).json({
                message: error.message || "Có lỗi xảy ra khi lấy danh sách hồ sơ"
            });
               
        }
    };

    getDetail = async (req: Request, res: Response): Promise<void> => {
        try {
            const id = req.params.id as string;
            const output = await this.dependencies.profile.getDetailProfileUsecase.execute(id);
            res.status(200).json({
                message: "Lấy chi tiết hồ sơ thành công",
                data: output
            });
        } catch (error: any) {
            res.status(404).json({
                message: error.message || "Không tìm thấy hồ sơ cá nhân"
            });
        }
    };

    getByUserId = async (req: Request, res: Response): Promise<void> => {
        try {
            const userId = req.params.userId as string;
            const output = await this.dependencies.profile.getByUserIdProfileUsecase.execute(userId);
            if (!output) {
                res.status(404).json({
                    message: "Người dùng chưa tạo hồ sơ cá nhân"
                });
                return;
            }
            res.status(200).json({
                message: "Lấy hồ sơ cá nhân thành công",
                data: output
            });
        } catch (error: any) {
            res.status(500).json({
                message: error.message || "Có lỗi xảy ra khi lấy hồ sơ cá nhân"
            });
        }
    };

    createOne = async (req: Request, res: Response): Promise<void> => {
        try {
            const { userId, fullName, phone, address, gender, birthday, bio } = req.body;
            if (!userId || !fullName) {
                res.status(400).json({
                    message: "userId và fullName là bắt buộc"
                });
                return;
            }

            const input: profileInputDto = {
                userId,
                fullName,
                phone,
                address,
                gender,
                birthday,
                bio
            };

            const output = await this.dependencies.profile.createOneProfileUsecase.execute(input);
            res.status(201).json({
                message: "Tạo hồ sơ cá nhân thành công",
                data: output
            });
        } catch (error: any) {
            res.status(400).json({
                message: error.message || "Có lỗi xảy ra khi tạo hồ sơ cá nhân"
            });
        }
    };

    updateOne = async (req: Request, res: Response): Promise<void> => {
        try {
            const id = req.params.id as string;
            const { fullName, phone, address, gender, birthday, bio } = req.body;
            const input: profileUpdateInputDto = {
                fullName,
                phone,
                address,
                gender,
                birthday,
                bio
            };

            const output = await this.dependencies.profile.updateOneProfileUsecase.execute(input, id);
            res.status(200).json({
                message: "Cập nhật hồ sơ cá nhân thành công",
                data: output
            });
        } catch (error: any) {
            res.status(400).json({
                message: error.message || "Có lỗi xảy ra khi cập nhật hồ sơ cá nhân"
            });
        }
    };
}
