export interface profileInputDto {
    id?: string;
    userId: string;
    fullName: string;
    phone?: string;
    address?: string;
    gender?: string;
    birthday?: Date | string;
    bio?: string;
}

export interface profileUpdateInputDto {
    fullName?: string;
    phone?: string;
    address?: string;
    gender?: string;
    birthday?: Date | string;
    bio?: string;
}
