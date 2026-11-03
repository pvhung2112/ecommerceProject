export interface productOutputDto {
    id: string;
    name: string;
    price: number;
    originalPrice?: number | null;
    slug?: string | null;
    description?: string | null;
    thumbnail?: string | null;
    images?: string[];
    stock?: number;
    status?: string;
    categoryId?: string | null;
    user: {
        id: string;
        name: string;
    };
}
