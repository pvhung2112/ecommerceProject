import { initCatalogModule, ICatalogModule } from "./modules/catalog/infrastructure/modules/catalog.module";
import { initIdentityModule, IIdentityModule } from "./modules/identity/infrastructure/modules/identity.module";

export interface IAppModules {
    catalog: ICatalogModule;
    identity: IIdentityModule;
}

export const initAppModules = (): IAppModules => {
    return {
        catalog: initCatalogModule(),
        identity: initIdentityModule()
    };
};
