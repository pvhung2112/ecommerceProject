import { Request, Response } from "express";
import { categoryInputDto } from "../../../application/ports/dto/categories/category.inputDto";
import { dependencies } from "../../../infrastructure/containers/index.container";

export class categoryController {
    constructor(private dependencies: dependencies) {}

    createOne = async (req: Request, res: Response): Promise<void> => {
        try {
            const { title, description, parentId, status } = req.body;
            const input: categoryInputDto = {
                title,
                description,
                parentId,
                status
            };

            const output = await this.dependencies.category.createOneCategoryUsecase.execute(input);

            res.status(201).json({
                message: `Tạo danh mục ${output.title} thành công!`,
                data: output
            });
        } catch (error: any) {
            res.status(400).json({
                message: error.message || "Có lỗi xảy ra khi tạo danh mục"
            });
        }
    };

    getAll = async (_req: Request, res: Response): Promise<void> => {
        try {
            const categories = await this.dependencies.category.getAllCategoriesUsecase.execute();
            res.status(200).json({
                message: "Lấy danh sách danh mục thành công",
                data: categories
            });
        } catch (error: any) {
            res.status(500).json({
                message: error.message || "Có lỗi xảy ra khi lấy danh sách danh mục"
            });
        }
    };

    getDetail = async (req: Request, res: Response): Promise<void> => {
        try {
            const id = req.params.id as string;
            const category = await this.dependencies.category.getDetailCategoryUsecase.execute(id);
            if (!category) {
                res.status(404).json({
                    message: "Không tìm thấy danh mục!"
                });
                return;
            }
            res.status(200).json({
                message: "Lấy chi tiết danh mục thành công",
                data: category
            });
        } catch (error: any) {
            res.status(500).json({
                message: error.message || "Có lỗi xảy ra khi lấy chi tiết danh mục"
            });
        }
    };
}
