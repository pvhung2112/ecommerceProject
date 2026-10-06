export interface CategoryParent {
    id: string;
    title: string;
}

export interface Category {
    id: string;
    title: string;
    slug?: string | null;
    description?: string | null;
    parentId?: string | null;
    status: string;
    createdAt?: string | Date;
    parent?: CategoryParent | null;
}

export interface CategoryInput {
    title: string;
    description?: string;
    parentId?: string;
    status?: string;
}
