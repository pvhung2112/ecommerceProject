import { productInputDto } from "../../../application/ports/dto/products/product.inputDto";
import {dependencies} from "../../../infrastructure/containers/index.container";
import { Request, Response } from "express";
export class productController {
    constructor(private dependencies : dependencies){}
    getAll = async (_req : Request,res : Response)=>{
        const output  = await this.dependencies.product.getAllProductsUsecase.execute();
        res.status(200).json(output);

    }
    createOne = async(req : Request, res : Response)=>{
        const {name , price, userId}  = req.body;
        const input : productInputDto = {
            name : name,
            price : price,
            userId : userId
        }
        const output  = await this.dependencies.product.createOneProductUsecase.execute(input);
        res.status(201).json(output);
    }
}