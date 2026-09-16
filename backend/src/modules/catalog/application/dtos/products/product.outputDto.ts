export interface productOutputDto {
    name: string;
    price: number;
    slug?: string | null;
    user: {
        id: string;
        name: string;
    };
}
