import { IChatModule } from "../../application/modules/ichat.module";
import { initConversationModule } from "./conversation.module";
import { initMessageModule } from "./message.module";

export const initChatModule =() : IChatModule=>{
      return {
        conversation : initConversationModule(),
        message : initMessageModule()
      }
}