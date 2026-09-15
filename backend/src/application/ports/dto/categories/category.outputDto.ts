export interface categoryOutputDto {
    id: string;
    title: string;
    slug?: string | null;
    description?: string | null;
    parentId?: string | null;
    status: string;
    createdAt?: Date;
    parent?: {
        id: string;
        title: string;
    } | null;
}
