import { prisma } from "../../../../shared/database/prisma.client";
import { authPayload } from "../../application/dtos/auth/auth.inputDto";
import { IAuthRepository } from "../../application/ports/repositories/iAuth.repository";
import { roleEntity } from "../../domain/entities/role.entity";
import { userEntity } from "../../domain/entities/user.entity";
import { profileEntity } from "../../domain/entities/profile.entity";
import { accountEntity } from "../../domain/entities/account.entity";

export class authRepository implements IAuthRepository {
    async register(data: authPayload): Promise<{ user: userEntity; role: roleEntity; profile: profileEntity; account: accountEntity; }> {
        const created  = await prisma.user.create({
               data: {
                email: data.email,
                roleId: data.roleId,
                status: "active",
                account: {
                    create: {
                        provider: data.provider,
                        providerAccountId: data.providerAccountId || data.email,
                        password: data.password,
                    }
                },
                profile: {
                    create: {
                        fullName: data.fullName || "User",
                    }
                }
            },
            include: {
                role: true,
                account: true,
                profile: true
            }

        });
        return {
            user  : new userEntity(created.id, created.roleId, created.email || undefined, created.status),
            role : new roleEntity(created.role.id, created.role.name, created.role.description || undefined),
            profile : new profileEntity(created.profile!.id, created.profile!.fullName, created.profile!.userId, created.profile!.phone ?? undefined, created.profile!.address ?? undefined, created.profile!.gender ?? undefined, created.profile!.birthday ?? undefined, created.profile!.bio ?? undefined),
            account : new accountEntity(created.account[0].id, created.account[0].provider, created.account[0].userId, created.account[0].providerAccountId ?? undefined, created.account[0].password ?? undefined)
        }
    }
} 