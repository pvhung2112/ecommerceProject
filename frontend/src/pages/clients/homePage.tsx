import { useState, useEffect } from "react";
import { productService, ProductList, type Product } from "../../features/product";
// import socket from "../../lib/socket";
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
    
// useEffect(() => {
    
//     socket.on("welcome", (data) => {
//         console.log(data.yourSocketId);
//         socket.emit("travedulieu",data)
       
//     });
//     return () => {
//         socket.off("welcome");
//     };
// }, []);
    return (
    <>
     <ProductList products={products} />
    </>
              
    );
}

export default HomePage;
