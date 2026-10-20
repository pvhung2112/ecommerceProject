import { useState, useEffect } from "react";
import { productService, ProductList, type Product } from "../../features/product";

function HomePage() {
    const [products, setProducts] = useState<Product[]>([]);

    const fetchProducts = async () => {
        const res = await productService.getAll();
        setProducts(res.data);
        console.log(res.data);
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
    <>
     <ProductList products={products} />
    </>
              
    );
}

export default HomePage;
