export interface productInputDto {
    name: string;
    price: number;
    userId?: string;
}

export interface productEditdto {
    id: string;
    data: productInputDto;
}
