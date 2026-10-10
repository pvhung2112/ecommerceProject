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

    getMyProfile = async (req: Request, res: Response): Promise<void> => {
            const userId = (req as any).user?.userId;
            const output = await this.dependencies.profile.getByUserIdProfileUsecase.execute(userId);
            
            res.status(200).json({
                message: "Lấy thông tin cá nhân thành công",
                data: output
            });
       
    };

    updateMyProfile = async (req: Request, res: Response): Promise<void> => {
        try {
            const userId = (req as any).user?.userId;
            if (!userId) {
                res.status(401).json({ message: "Không tìm thấy thông tin đăng nhập" });
                return;
            }

            const profile = await this.dependencies.profile.getByUserIdProfileUsecase.execute(userId);
            if (!profile) {
                res.status(404).json({ message: "Không tìm thấy hồ sơ cá nhân" });
                return;
            }

            const { fullName, phone, address, gender, birthday, bio } = req.body;
            const input: profileUpdateInputDto = {
                fullName,
                phone,
                address,
                gender,
                birthday,
                bio
            };

            const output = await this.dependencies.profile.updateOneProfileUsecase.execute(input, profile.id);
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
