import { initCatalogModule, ICatalogModule } from "./modules/catalog/infrastructure/modules/catalog.module";
import { initIdentityModule, IIdentityModule } from "./modules/identity/infrastructure/modules/identity.module";
import { IChatModule } from "./modules/chats/application/modules/ichat.module";
import { initChatModule } from "./modules/chats/infrastructure/modules/chat.module";

export interface IAppModules {
    catalog: ICatalogModule;
    identity: IIdentityModule;
    chats: IChatModule;
}

export const initAppModules = (): IAppModules => {
    return {
        catalog: initCatalogModule(),
        identity: initIdentityModule(),
        chats: initChatModule(),
    };
};
