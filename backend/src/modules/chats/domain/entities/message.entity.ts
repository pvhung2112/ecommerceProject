export class messageEntity {
    private readonly id: string;
    private conversationId: string;
    private senderId: string;
    private content: string;
    private status: string;
    private createdAt: Date;

    constructor(
        id: string,
        conversationId: string,
        senderId: string,
        content: string,
        status: string = "sent",
        createdAt: Date = new Date()
    ){
        this.id = id;
        this.conversationId = conversationId;
        this.senderId = senderId;
        this.content = content;
        this.status = status;
        this.createdAt = createdAt;
    }

    public getId(): string {
        return this.id;
    }
    public getConversationId(): string {
        return this.conversationId;
    }
    public getSenderId(): string {
        return this.senderId;
    }
    public getContent(): string {
        return this.content;
    }
    public getStatus(): string {
        return this.status;
    }
    public getCreatedAt(): Date {
        return this.createdAt;
    }

    public setContent(content: string): void {
        this.content = content;
    }
    public setStatus(status: string): void {
        this.status = status;
    }
}