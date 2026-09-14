import { productInputDto } from "../../../application/ports/dto/products/product.inputDto";
import {dependencies} from "../../../infrastructure/containers/index.container";
import { Request, Response } from "express";
import { productEditdto } from "../../../application/ports/dto/products/product.inputDto";
export class productController {
    constructor(private dependencies : dependencies){}
    getAll = async (_req : Request,res : Response)=>{
        const output  = await this.dependencies.product.getAllProductsUsecase.execute();
        res.status(200).json({
            message : "thành công",
            data : output
        });

    }
    getDetail = async(req : Request, res : Response)=>{
         const id = req.params.id as string;
       const output  = await this.dependencies.product.getDetailProductUsecase.execute(id);
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
    editOne = async(req : Request, res : Response) =>{
        const id = req.params.id as string;
        const {name , price}  = req.body;
        const input : productInputDto = {
            name : name,
            price : price,
        }
        const output  =  await this.dependencies.product.editOneProductUsecase.execute(input,id);
        res.status(200).json({
            message: `Cập nhật ${output.name} thành công!`,
            data: output
        });
    }
    editMulti = async(req : Request, res : Response) =>{
        const dataProducts: productEditdto[] = req.body.dataProducts; 
        const output = await this.dependencies.product.editMuiltiProductUsecase.execute(dataProducts);
        res.status(200).json({
            message: `Cập nhật all thành công!`,
            data: output
        });
    }
    deleteOne = async(req : Request,res : Response)=>{

    }
}