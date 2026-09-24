export interface registerInputDto {
    email: string;
    password: string;
    fullName?: string;
}
export interface authPayload {
    provider: 'local' | 'google' | 'facebook';
    providerAccountId: string;
    email?: string;
    fullName?: string;
    password?: string;
    roleId: string;
}
export interface loginInputDto {
    email: string;
    password: string;
}