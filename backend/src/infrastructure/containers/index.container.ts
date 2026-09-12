import { IContainerProduct } from "./product.container"

export const containerMain = ()=>{
    return {
       product : IContainerProduct() 
    }
}
export type dependencies = ReturnType<typeof containerMain> 