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
    async findByEmail(email: string): Promise<{ user: userEntity; role: roleEntity; profile: profileEntity; account: accountEntity; } | null> {
        const founded = await prisma.user.findUnique({
            where: { email: email },
            include: {
                role: true,
                profile: true,
                account: {
                    where: {
                        provider: "local"
                    }
                }
            }
        });

        if (!founded || founded.account.length === 0) {
            return null;
        }

        return {
            user: new userEntity(founded.id, founded.roleId, founded.email || undefined, founded.status),
            role: new roleEntity(founded.role.id, founded.role.name, founded.role.description || undefined),
            profile: new profileEntity(
                founded.profile!.id,
                founded.profile!.fullName,
                founded.profile!.userId,
                founded.profile!.phone ?? undefined,
                founded.profile!.address ?? undefined,
                founded.profile!.gender ?? undefined,
                founded.profile!.birthday ?? undefined,
                founded.profile!.bio ?? undefined
            ),
            account: new accountEntity(
                founded.account[0].id,
                founded.account[0].provider,
                founded.account[0].userId,
                founded.account[0].providerAccountId ?? undefined,
                founded.account[0].password ?? undefined
            )
        };
    }
}
