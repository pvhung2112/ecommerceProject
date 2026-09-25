import { IIdentityModule } from "../../application/modules/iidentity.module";
import { roleModule } from "./role.module";
import { profileModule } from "./profile.module";
import { authModule } from "./auth.module";

export { IIdentityModule } from "../../application/modules/iidentity.module";

export const initIdentityModule = (): IIdentityModule => {
    return {
        role: roleModule(),
        profile: profileModule(),
        auth: authModule()
    };
};
