export interface ProductUser {
    id: string;
    name: string;
}

export interface Product {
    id: string;
    name: string;
    price: number;
    originalPrice?: number | null;
    slug?: string | null;
    thumbnail?: string | null;
    description?: string | null;
    images?: string[];
    stock?: number;
    status?: string;
    categoryId?: string | null;
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
    originalPrice?: number;
    userId?: string;
    description?: string;
    thumbnail?: string;
    images?: string[];
    stock?: number;
    status?: string;
    categoryId?: string;
}
