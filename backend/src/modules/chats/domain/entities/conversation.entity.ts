
export class conversationEntity {
    private readonly id: string; 
    private name?: string;
    private isGroup: boolean;
    private lastMessage?: string;
    private userIds?: string[];
    private createdAt: Date;
    private updatedAt: Date;    
    constructor(
        id: string,
        name?: string,
        isGroup: boolean = false,
        lastMessage?: string,
        userIds: string[] = [],
        createdAt: Date = new Date(),
        updatedAt: Date = new Date()
    ) {
        this.id = id;
        this.name = name;
        this.isGroup = isGroup;
        this.lastMessage = lastMessage;
        this.userIds = userIds;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
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
    public getCreatedAt(): Date {
        return this.createdAt;
    }
    public getUpdatedAt(): Date {
        return this.updatedAt;
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