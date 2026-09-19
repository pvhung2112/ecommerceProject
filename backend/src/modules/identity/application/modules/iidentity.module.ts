import { IRoleModule } from "./irole.module";
import { IProfileModule } from "./iprofile.module";

export interface IIdentityModule {
   role: IRoleModule;
   profile: IProfileModule;
}
