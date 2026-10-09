import { IConversationModule } from "./iconversation.module";
import { IMessageModule } from "./imessage.module";

export interface IChatModule {
    conversation: IConversationModule;
    message: IMessageModule;
}