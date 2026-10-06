import { ProductCard } from "./productCard";
import type { ProductListProps } from "../types/product.type";

export function ProductList({ products }: ProductListProps) {
    return (
        <div className="product-list" >
            {products.map((item) => (
                <ProductCard key={item.id} data={item} />
            ))}
        </div>
    );
}

export default ProductList;
