import { IRoleModule } from "./irole.module";
import { IProfileModule } from "./iprofile.module";
import { IAuthModule } from "./iauth.module";

export interface IIdentityModule {
   role: IRoleModule;
   profile: IProfileModule;
   auth : IAuthModule;
}
