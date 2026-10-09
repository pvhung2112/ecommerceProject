export class conversationEntity {
    private readonly id: string;
    private name?: string;
    private isGroup: boolean;
    private lastMessage?: string;
    private userIds?: string[];
    private updatedAt: Date;
    private createdAt: Date;

    constructor(
        id: string,
        updatedAt: Date,
        createdAt: Date,
        lastMessage?: string,
        name?: string,
        isGroup: boolean = false,
        userIds: string[] = []
    ) {
        this.id = id;
        this.updatedAt = updatedAt;
        this.createdAt = createdAt;
        this.lastMessage = lastMessage;
        this.name = name;
        this.isGroup = isGroup;
        this.userIds = userIds;
    }

    public getId(): string {
        return this.id;
    }
    public getName(): string | undefined {
        return this.name;
    }
    public getIsGroup(): boolean {
        return this.isGroup;
    }
    public getLastMessage(): string | undefined {
        return this.lastMessage;
    }
    public getUserIds(): string[] | undefined {
        return this.userIds;
    }
    public getUpdatedAt(): Date {
        return this.updatedAt;
    }
    public getCreatedAt(): Date {
        return this.createdAt;
    }

    public setLastMessage(lastMessage: string): void {
        this.lastMessage = lastMessage;
    }
    public setName(name: string): void {
        this.name = name;
    }
    public setUserIds(userIds: string[]): void {
        this.userIds = userIds;
    }
}