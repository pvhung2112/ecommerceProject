import { Express } from "express";
import { IAppModules } from "./app.module";
import { productRouter } from "./modules/catalog/presentation/routes/product.route";
import { categoryRouter } from "./modules/catalog/presentation/routes/category.route";
import { roleRouter } from "./modules/identity/presentation/routers/role.route";
import { profileRouter } from "./modules/identity/presentation/routers/profile.route";
import { authRouter } from "./modules/identity/presentation/routers/auth.route";
import { conversationRouter } from "./modules/chats/presentation/routers/conversation.route";
import { messageRouter } from "./modules/chats/presentation/routers/message.route";

export const registerAppRoutes = (app: Express, modules: IAppModules, prefix: string) => {
    app.use(`${prefix}/products`, productRouter(modules.catalog));
    app.use(`${prefix}/categories`, categoryRouter(modules.catalog));

    app.use(`${prefix}/roles`, roleRouter(modules.identity));
    app.use(`${prefix}/profiles`, profileRouter(modules.identity));
    app.use(`${prefix}/auth`, authRouter(modules.identity));

    app.use(`${prefix}/chats/conversation`, conversationRouter(modules.chats));
    app.use(`${prefix}/chats/message`, messageRouter(modules.chats));
};
