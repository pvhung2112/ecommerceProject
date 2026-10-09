import { loginInputDto, registerInputDto } from "../../application/dtos/auth/auth.inputDto";
import { IIdentityModule } from "../../application/modules/iidentity.module";
import { Request, Response } from "express";
import { JWT_CONFIG } from "../../../../config/jwt.config";
import { jwtService } from "../../../../shared/services/auth/jwt.service";

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

  
            if (output.token) {
                res.cookie("accessToken", output.token.accessToken, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    sameSite: "lax", 
                    maxAge: JWT_CONFIG.ACCESS.MAX_AGE_MS
                });

                res.cookie("refreshToken", output.token.refreshToken, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    sameSite: "lax", 
                    maxAge: JWT_CONFIG.REFRESH.MAX_AGE_MS
                });
            }

            const { token, ...userData } = output;
            res.status(200).json({
                message: "Đăng nhập tài khoản thành công",
                data: userData
            });
        } catch (error: any) {
            res.status(401).json({
                message: error.message || "Đăng nhập tài khoản thất bại"
            });
        }
    };

    refreshToken = async (req: Request, res: Response): Promise<void> => {
        try {
            const currentRefreshToken = req.cookies?.refreshToken;
            if (!currentRefreshToken) {
                res.status(401).json({
                    message: "Không tìm thấy Refresh Token, vui lòng đăng nhập lại!",
                    code: "REFRESH_TOKEN_NOT_FOUND"
                });
                return;
            }

            const decoded = jwtService.verifyRefreshToken(currentRefreshToken);
            const newAccesstoken = jwtService.signAcessToken({
                userId: decoded.userId,
                email: decoded.email,
                roleId: decoded.roleId
            });

            res.cookie("accessToken", newAccesstoken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
                maxAge: JWT_CONFIG.ACCESS.MAX_AGE_MS
            });

            res.status(200).json({
                message: "Refresh token thành công",
                data: {
                    accessToken: newAccesstoken
                }
            });
        } catch (error: any) {
            res.clearCookie("accessToken");
            res.clearCookie("refreshToken");
            res.status(401).json({
                message: "Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại!",
                code: "REFRESH_TOKEN_EXPIRED"
            });
        }
    };
}