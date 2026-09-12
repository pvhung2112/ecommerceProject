export interface IUsecase<Input,Output>{
    execute(i? : Input) : Promise<Output>;
}