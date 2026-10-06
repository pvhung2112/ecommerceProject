import type { ProductCardProps } from "../types/product.type";

export function ProductCard({ data }: ProductCardProps) {
    return (
        <div className="product-card">
            <h3>{data.name}</h3>
            <p>{data.price} đ</p>
            <p>Người bán: {data.user.name}</p>
        </div>
    );
}

export default ProductCard;