import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { appConfig } from '../../config/app.config';

const adapter = new PrismaPg(appConfig.databaseUrl!);

export const prisma = new PrismaClient({ adapter });
