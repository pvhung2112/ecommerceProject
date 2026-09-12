export class roleEntity{
    private readonly id: string
    private name : string;
    description? : string;
    constructor(id: string, name: string, description?: string){
        this.id = id;
        this.name = name;
        this.description = description;
    }
    getId(): string{
        return this.id;
    }
    getName(): string{
        return this.name;
    }
    getDescription(): string | undefined{
        return this.description;
    }
    setName(name: string): void{
        this.name = name;
    }
    
}