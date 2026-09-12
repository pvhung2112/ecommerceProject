import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

export class prismaSingleton {
    private static prisma: PrismaClient;
    private constructor() {}

    public static getInstance(): PrismaClient {
        if (!this.prisma) {
            const adapter = new PrismaPg(process.env.DATABASE_URL!);
            this.prisma = new PrismaClient({ adapter });
        }
        return this.prisma;
    }
}
export const prisma = prismaSingleton.getInstance();
