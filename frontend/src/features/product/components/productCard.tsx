import { Link } from "react-router-dom";
import type { ProductCardProps } from "../types/product.type";

const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=600&q=80";

export function ProductCard({ data }: ProductCardProps) {
    const detailUrl = data.slug ? `/products/${data.slug}` : `/products/${data.id}`;

    return (
        <div className="product-card">
            <Link to={detailUrl} className="product-card-link">
                <div className="product-thumb-wrapper">
                    <img 
                        src={data.thumbnail || DEFAULT_IMAGE} 
                        alt={data.name} 
                        className="product-thumb-img" 
                        loading="lazy" 
                    />
                    <span className="product-badge-mall">Chính hãng</span>
                </div>

                <div className="product-card-body">
                    <h3 className="product-title" title={data.name}>
                        {data.name}
                    </h3>

                    <div className="product-price-wrapper">
                        <span className="product-price-current">{data.price}đ</span>
                        {data.originalPrice && data.originalPrice > data.price && (
                            <span className="product-price-original">{data.originalPrice}đ</span>
                        )}
                    </div>
                </div>
            </Link>  

            <div className="product-actions">
                <button className="btn-add-cart"> Add to cart</button>
            </div>
        </div>
    );
}


