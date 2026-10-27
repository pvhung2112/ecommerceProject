import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { appConfig } from '../../config/app.config';

const adapter = new PrismaPg(appConfig.databaseUrl!);

export const prisma = new PrismaClient({
    adapter
    // log: ['query', 'error', 'warn']
 });
export const connectDatabase = async ()=>{
    try {
        await prisma.$connect();
        console.log("kết nối đến db thành công");
    } catch (error) {
        console.log("kết nối đến db thất bại",error);
    }
}