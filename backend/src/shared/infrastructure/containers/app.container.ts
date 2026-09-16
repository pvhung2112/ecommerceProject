import { catalogContainer, ICatalogContainer } from "../../../modules/catalog/infrastructure/containers/catalog.container";
import { identityContainer, IIdentityContainer } from "../../../modules/identity/infrastructure/containers/identity.container";

export interface IAppContainer {
    catalog: ICatalogContainer;
    identity: IIdentityContainer;
}

export const buildAppContainer = (): IAppContainer => {
    return {
        catalog: catalogContainer(),
        identity: identityContainer()
    };
};
