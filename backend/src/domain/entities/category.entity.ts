export class categoryEntity{
    private readonly id : string;
    private  title : string;
    private parentId ?: string;
    private status : string;
    private description ?: string;

    constructor(id: string, title: string, parentId?: string, status: string = "active", description?: string) {
        this.id = id;
        this.title = title;
        this.parentId = parentId;
        this.status = status;
        this.description = description;
    }
    getId(): string {
        return this.id;
    }   
    getTitle(): string {
        return this.title;
    }   
   
    getParentId(): string |undefined {
        return this.parentId;
    }
    getStatus(): string {
        return this.status;
    }
    getDescription(): string |undefined{
        return this.description;
    }  
    setTitle(title: string): void {
        this.title = title;
    }
    
    setParentId(parentId: string): void {  
        this.parentId = parentId;
    }
    setStatus(status: string): void {
        this.status = status;
    }
    setDescription(description: string): void {
        this.description = description;
    }

}
  
