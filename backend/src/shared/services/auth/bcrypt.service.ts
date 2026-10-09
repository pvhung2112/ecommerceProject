import bcrypt from 'bcryptjs';
export class bcryptService{
    static async hash(password : string) : Promise<string>{
        const saltRounds = 10;
        return await bcrypt.hash(password,saltRounds);
    }
    static async compare(password : string , hash : string) : Promise<boolean>{
        return await bcrypt.compare(password,hash);
    }
}