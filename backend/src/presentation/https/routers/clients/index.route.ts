import {Express } from "express";
import { productRouter } from "./product.route";
import { dependencies } from "../../../../infrastructure/containers/index.container";
export const routerClients = (app :  Express,deps : dependencies)=>{
    const api = "/api/v1";
    app.use(`${api}/products`,productRouter(deps));

}