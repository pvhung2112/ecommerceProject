export interface productOutputDto {
    id: string;
    name: string;
    price: number;
    slug?: string | null;
    user: {
        id: string;
        name: string;
    };
}
