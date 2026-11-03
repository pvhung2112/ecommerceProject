export interface productInputDto {
    name: string;
    price: number;
    userId?: string;
    originalPrice?: number;
    description?: string;
    thumbnail?: string;
    images?: string[];
    stock?: number;
    status?: string;
    categoryId?: string;
}

export interface productEditdto {
    id: string;
    data: productInputDto;
}
