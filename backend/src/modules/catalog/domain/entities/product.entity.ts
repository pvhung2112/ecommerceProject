export class productEntity {
    private readonly id: string;
    private name: string;
    private price: number;
    private readonly userId: string;

    private description?: string;
    private thumbnail?: string;
    private images: string[] = [];
    private originalPrice?: number;
    private stock: number = 0;
    private status: string = "active";
    private categoryId?: string;

    constructor(
        id: string,
        name: string,
        price: number,
        userId: string,
        description?: string,
        thumbnail?: string,
        images: string[] = [],
        originalPrice?: number,
        stock: number = 0,
        status: string = "active",
        categoryId?: string
    ) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.userId = userId;

        this.description = description;
        this.thumbnail = thumbnail;
        this.images = images;
        this.originalPrice = originalPrice;
        this.stock = stock;
        this.status = status;
        this.categoryId = categoryId;
    }

    getId(): string {
        return this.id;
    }
    getName(): string {
        return this.name;
    }
    getPrice(): number {
        return this.price;
    }
    getUserId(): string {
        return this.userId;
    }
    getDescription(): string | undefined {
        return this.description;
    }
    getThumbnail(): string | undefined {
        return this.thumbnail;
    }
    getImages(): string[] {
        return this.images;
    }
    getOriginalPrice(): number | undefined {
        return this.originalPrice;
    }
    getStock(): number {
        return this.stock;
    }
    getStatus(): string {
        return this.status;
    }
    getCategoryId(): string | undefined {
        return this.categoryId;
    }

    setName(name: string): void {
        this.name = name;
    }
    setPrice(price: number): void {
        this.price = price;
    }
    setDescription(description?: string): void {
        this.description = description;
    }
    setThumbnail(thumbnail?: string): void {
        this.thumbnail = thumbnail;
    }
    setImages(images: string[]): void {
        this.images = images;
    }
    setOriginalPrice(originalPrice?: number): void {
        this.originalPrice = originalPrice;
    }
    setStock(stock: number): void {
        this.stock = stock;
    }
    setStatus(status: string): void {
        this.status = status;
    }
    setCategoryId(categoryId?: string): void {
        this.categoryId = categoryId;
    }
}
