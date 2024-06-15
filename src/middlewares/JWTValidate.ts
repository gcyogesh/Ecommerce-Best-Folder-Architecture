import { verify, sign } from "jsonwebtoken";

export const createAccessToken = (user:any)=>{
    const access = sign({id:user.id}, "yogesh");

    return access;
}


