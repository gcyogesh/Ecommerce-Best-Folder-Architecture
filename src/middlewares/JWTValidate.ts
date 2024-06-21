import { verify, sign, JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { AuthRequest } from "../../types";
import UserModel from "../models/UserSchema";

const JWT_SECRET = process.env.JWT_SECRET || 'jwt'
export const createAccessToken = (user:any)=>{
    const access = sign({id:user.id}, JWT_SECRET);

    return access;
}


export const validateToken = async(req:AuthRequest, res:Response, next:NextFunction)=>{
    const accesstoken = req.cookies['access-token']
    if(!accesstoken){
        res.status(400).json({msg:"User is not authenticatd"})
        }
        
        try {
            const validToken =verify(accesstoken, JWT_SECRET) as JwtPayload;
            const user = await UserModel.findById(validToken.id)
        if(validToken){
               req.user = user;
            return next();
        }
    } catch (error) {
        
    }

}
