export interface productOutputDto{
    name: string;
    price: number;
    user : {
        id : string,
        name : string;
    }
}