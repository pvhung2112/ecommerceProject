
import { messageEntity } from "../../domain/entities/message.entity";
export interface messageWithUsers {
    message : messageEntity;
    sender: {
        id: string;
        name: string;
    };
    receiverIds?: string[]
}             