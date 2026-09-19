import { IIdentityModule } from "../../application/modules/iidentity.module";
import { roleModule } from "./role.module";
import { profileModule } from "./profile.module";

export { IIdentityModule } from "../../application/modules/iidentity.module";

export const initIdentityModule = (): IIdentityModule => {
    return {
        role: roleModule(),
        profile: profileModule()
    };
};
