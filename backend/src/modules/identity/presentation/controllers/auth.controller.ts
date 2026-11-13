import { loginInputDto, registerInputDto } from "../../application/dtos/auth/auth.inputDto";
import { IIdentityModule } from "../../application/modules/iidentity.module";
import { Request, Response } from "express";
import { JWT_CONFIG } from "../../../../config/jwt.config";
import { jwtService } from "../../../../shared/services/auth/jwt.service";

export class authController {
    constructor(private dependencies: IIdentityModule) { }

    register = async (req: Request, res: Response): Promise<void> => {
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
    };

    login = async (req: Request, res: Response): Promise<void> => {
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
    };

    refreshToken = async (req: Request, res: Response): Promise<void> => {
            const currentRefreshToken = req.cookies?.refreshToken;
            if (!currentRefreshToken) {
                res.status(401).json({
                    message: "Không tìm thấy Refresh Token",
                    code: "REFRESH_TOKEN_NOT_FOUND"
                });
                return;
            }

            try {
                const decoded = jwtService.verifyRefreshToken(currentRefreshToken);
                const payload = {
                    userId: decoded.userId,
                    email: decoded.email,
                    roleId: decoded.roleId
                };
                const newAccesstoken = jwtService.signAcessToken(payload);
                const newRefreshtoken = jwtService.signRefreshToken(payload);
                res.cookie("accessToken", newAccesstoken, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    sameSite: "lax",
                    maxAge: JWT_CONFIG.ACCESS.MAX_AGE_MS
                });

                res.cookie("refreshToken", newRefreshtoken, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    sameSite: "lax",
                    maxAge: JWT_CONFIG.REFRESH.MAX_AGE_MS
                });
                
                res.status(200).json({
                    message: "Refresh token thành công",
                    data: {
                        accessToken: newAccesstoken
                    }
                });
            } catch (error) {
                res.clearCookie("accessToken");
                res.clearCookie("refreshToken");
                res.status(401).json({
                    message: "Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại",
                    code: "REFRESH_TOKEN_EXPIRED"
                });
            }
            
    };
}