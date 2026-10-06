export interface ProductUser {
    id: string;
    name: string;
}

export interface Product {
    id: string;
    name: string;
    price: number;
    slug?: string | null;
    user: ProductUser;
}

export interface ProductCardProps {
    data: Product;
}

export interface ProductListProps {
    products: Product[];
}

export interface ProductInput {
    name: string;
    price: number;
    userId?: string;
}
