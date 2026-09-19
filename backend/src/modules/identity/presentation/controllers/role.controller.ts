import { Request, Response } from "express";
import { roleInputDto } from "../../application/dtos/roles/role.inputDto";
import { IIdentityModule } from "../../application/modules/iidentity.module";

export class roleController {
    constructor(private dependences: IIdentityModule) {}

    getAll = async (_req: Request, res: Response): Promise<void> => {
        try {
            const output = await this.dependences.role.getAllRoleUsecase.execute();
            res.status(200).json({
                message: "Lấy danh sách role thành công",
                data: output
            });
        } catch (error: any) {
            res.status(500).json({
                message: error.message || "Có lỗi xảy ra khi lấy danh sách role"
            });
        }
    };

    getDetail = async (req: Request, res: Response): Promise<void> => {
        try {
            const id = req.params.id as string;
            const output = await this.dependences.role.getDetailroleusecase.execute(id);
            res.status(200).json({
                message: "Lấy chi tiết role thành công",
                data: output
            });
        } catch (error: any) {
            res.status(404).json({
                message: error.message || "Không tìm thấy role"
            });
        }
    };

    createOne = async (req: Request, res: Response): Promise<void> => {
        try {
            const { name, description } = req.body as { name: string; description?: string };
            const input: roleInputDto = {
                name,
                description
            };
            const output = await this.dependences.role.createOneroleusecase.execute(input);
            res.status(201).json({
                message: "Tạo role thành công",
                data: output
            });
        } catch (error: any) {
            res.status(500).json({
                message: error.message || "Có lỗi xảy ra khi tạo role"
            });
        }
    };

    editOne = async (req: Request, res: Response): Promise<void> => {
        try {
            const id = req.params.id as string;
            const { name, description } = req.body as { name: string; description?: string };
            const input: roleInputDto = {
                name,
                description
            };
            const output = await this.dependences.role.updateOneroleusecase.execute(input, id);
            res.status(200).json({
                message: "Cập nhật role thành công",
                data: output
            });
        } catch (error: any) {
            res.status(500).json({
                message: error.message || "Có lỗi xảy ra khi cập nhật role"
            });
        }
    };

    editMulti = async (req: Request, res: Response): Promise<void> => {
        try {
            const dataRoles: roleInputDto[] = req.body.dataRoles || req.body;
            const output = await this.dependences.role.updateMultiroleusecase.execute(dataRoles);
            res.status(200).json({
                message: "Cập nhật nhiều role thành công",
                data: output
            });
        } catch (error: any) {
            res.status(500).json({
                message: error.message || "Có lỗi xảy ra khi cập nhật nhiều role"
            });
        }
    };

    deleteOne = async (req: Request, res: Response): Promise<void> => {
        res.status(200).json({
            message: "Tính năng deleteOne đang phát triển"
        });
    };
}