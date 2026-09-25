import { loginInputDto, registerInputDto } from "../../application/dtos/auth/auth.inputDto";
import { IIdentityModule } from "../../application/modules/iidentity.module";
import { Request, Response } from "express";
export class authController {
    constructor(private dependencies: IIdentityModule) { }
    register = async (req: Request, res: Response): Promise<void> => {
        try {
            const input: registerInputDto = {
                email: req.body.email,
                password: req.body.password,
                fullName: req.body.fullName
            };
            
            const output = await this.dependencies.auth.registerByEmailUsecase.execute(input);
            res.status(201).json({
                message: "Đăng ký tài khoản thành công",
                data: output
            });
        } catch (error: any) {
            res.status(400).json({
                message: error.message || "Đăng ký tài khoản thất bại"
            });
        }
    };

    login = async (req: Request, res: Response): Promise<void> => {
        try {
            const input: loginInputDto = {
                email: req.body.email,
                password: req.body.password,
            };

            const output = await this.dependencies.auth.loginByEmailUsecase.execute(input);
            res.status(200).json({
                message: "Đăng nhập tài khoản thành công",
                data: output
            });
        } catch (error: any) {
            res.status(401).json({
                message: error.message || "Đăng nhập tài khoản thất bại"
            });
        }
    };

    refreshToken = async (_req: Request, res: Response): Promise<void> => {
        res.status(501).json({
            message: "Tính năng refreshToken đang được phát triển"
        });
    };
}