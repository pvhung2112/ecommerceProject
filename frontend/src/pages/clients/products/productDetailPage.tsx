import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { productService, ProductDetail, type Product } from "../../../features/product";

export function ProductDetailPage() {
    const { id } = useParams<{ id: string }>();
const [product, setProduct] = useState<Product>();
    const fetchProductDetail = async () => {
        if (!id) return;
        const data = await productService.getDetail(id);
        setProduct(data);
    };
    useEffect(() => {
        fetchProductDetail();
    }, [id]);
    return(<>
    {product && <ProductDetail product={product}/>}
    </>)
}

