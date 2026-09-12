export class productEntity{
    private readonly id: string;
    private name : string;
    private price : number;
    private readonly userId : string;
    constructor(id: string, name: string, price: number, userId: string){
        this.id = id;
        this.name = name;
        this.price = price;
        this.userId = userId;
    }
    getId(): string{
        return this.id;
    }
    getName(): string{
        return this.name;
    }
    getPrice(): number{
        return this.price;
    }
    getUserId(): string{
        return this.userId;
    }
    setName(name: string): void{
        this.name = name;
    }
    setPrice(price: number): void{
        this.price = price;
    }

}