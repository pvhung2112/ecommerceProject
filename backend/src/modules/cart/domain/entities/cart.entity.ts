export class cartEntity {
    private readonly id: string;
    private userId: string;
    private createdAt: Date;
    private updatedAt: Date;

    constructor(
        id: string,
        userId: string,
        createdAt: Date = new Date(),
        updatedAt: Date = new Date()
    ) {
        this.id = id;
        this.userId = userId;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public getId(): string {
        return this.id;
    }

    public getUserId(): string {
        return this.userId;
    }

    public getCreatedAt(): Date {
        return this.createdAt;
    }

    public getUpdatedAt(): Date {
        return this.updatedAt;
    }

    public setUserId(userId: string): void {
        this.userId = userId;
        this.updatedAt = new Date();
    }
}

