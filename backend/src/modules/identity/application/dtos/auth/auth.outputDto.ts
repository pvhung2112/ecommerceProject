export interface authOutputDto {
    id: string;
    user : {
        id : string;
        email? : string;
        roleId : string;
        status : string;
    }
    role : {
        id : string ;
        name : string;
    }
    profile :{
        id : string;
        userId : string
        fullName: string;
        phone?: string;
    }
    account : {
        id : string;
        provider : string;
        userId : string;
    }
}