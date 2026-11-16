export class cartItemEntity {
    private readonly id: string;
    private cartId: string;
    private productId: string;
    private quantity: number;
    private createdAt: Date;
    private updatedAt: Date;

    constructor(
        id: string,
        cartId: string,
        productId: string,
        quantity: number = 1,
        createdAt: Date = new Date(),
        updatedAt: Date = new Date()
    ) {
        this.id = id;
        this.cartId = cartId;
        this.productId = productId;
        this.quantity = quantity;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public getId(): string {
        return this.id;
    }

    public getCartId(): string {
        return this.cartId;
    }

    public getProductId(): string {
        return this.productId;
    }

    public getQuantity(): number {
        return this.quantity;
    }

    public getCreatedAt(): Date {
        return this.createdAt;
    }

    public getUpdatedAt(): Date {
        return this.updatedAt;
    }

    public setQuantity(quantity: number): void {
        if (quantity < 1) {
            throw new Error("Số lượng sản phẩm trong giỏ hàng phải lớn hơn hoặc bằng 1");
        }
        this.quantity = quantity;
        this.updatedAt = new Date();
    }

    public increaseQuantity(amount: number = 1): void {
        this.quantity += amount;
        this.updatedAt = new Date();
    }

    public decreaseQuantity(amount: number = 1): void {
        if (this.quantity - amount < 1) {
            throw new Error("Số lượng sản phẩm không thể giảm xuống dưới 1");
        }
        this.quantity -= amount;
        this.updatedAt = new Date();
    }
}

