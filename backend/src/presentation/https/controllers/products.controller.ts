import {dependencies} from "../../../infrastructure/containers/index.container";
import { Request, Response } from "express";
export class productController {
    constructor(private dependencies : dependencies){}
    getAll = async (req : Request,res : Response)=>{
        const output  = await this.dependencies.product.getAllProductsUsecase.execute();
        res.status(200).json(output);

    }
}