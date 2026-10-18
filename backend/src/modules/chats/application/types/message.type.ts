
import { messageEntity } from "../../domain/entities/message.entity";
export interface messageWithUsers {
    massage : messageEntity;
    sender: {
        id: string;
        name: string;
    };             
}