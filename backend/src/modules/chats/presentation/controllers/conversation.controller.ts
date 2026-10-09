import { Request, Response } from "express";
import { IChatModule } from "../../application/modules/ichat.module";

export class conversationController{
    constructor(private dependencies: IChatModule) {}
    getAll = async (req : Request,res : Response)=>{

    }
    getDetail = async (req : Request,res : Response)=>{
        
    }
}