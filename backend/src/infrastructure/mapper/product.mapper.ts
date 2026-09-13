import { productEntity } from "../../domain/entities/product.entity";

export class productMapper{

    public static toPersistence(item : productEntity){ //entity->db
        return {
            name : item.getName(),
            price : item.getPrice(),
            userId : item.getUserId()
        }
    }
    public static toDomain(raw : any) : productEntity{
        return new productEntity(raw.id,raw.name,Number(raw.price),raw.userId);
    }
}