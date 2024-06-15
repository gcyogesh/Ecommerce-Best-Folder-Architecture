import UserModel from "../models/UserSchema";
import { Request, Response } from "express";
import { hashPassword, comparePassword } from "../utils/HashPassword";
import { ProvideMail } from "../utils/NodeMailer";
import { createAccessToken } from "../middlewares/JWTValidate";


export const RegisterUser = async(req:Request, res:Response)=>{
    try {
        const {username, email, password} = req.body;
        console.log(req.body);

        // validation for email 
        const emaiExist = await UserModel.findOne({email})
        if(emaiExist){
            return res.status(400).json({msg:"Email already exist", sucess:false})
        }
        const DoHashPassword = await hashPassword(password)

        

        const user = await UserModel.create({
            username, email, password:DoHashPassword
        })
        

        // send welcome mail to user 
        const subject = "Welcome to our Company hero"          // yo chai subject
        const to = email            // Mail kallai pathaunay?
        const text = `Hi ${username} Thank you for regestering in our company welcome gang.`
        await  ProvideMail(to, subject, text)  // all parameter


        res.status(201).json({msg:"New user created sucessfully", suces:true, user:user})

        
    } catch (error) {
         console.log(error, "Error registering data")
         res.status(500).json({msg:"Internal server error", sucess:false})
         
    }

}



export const LoginUser = async(req:Request, res:Response)=>{
    try {
        const {email, password} = req.body;
        // paile user find garnay 
        const user = await UserModel.findOne({email})
        if(!user){
            return res.status(400).json({msg:"Not a valid email", sucess:false})
        }
        // comparte the pasword with register 
        const isMatch = await comparePassword(password, user.password ?? '')
        if(!isMatch){
            return res.status(400).json({msg:"Invalid email or password", sucess:false})
        }

        // lesh create jwt
        const accessToken = createAccessToken(user);
        res.cookie('access-token', accessToken,{httpOnly:true, maxAge: 35000000, })
        
        return res.status(200).json({msg:"User logged in sucessfully", sucess:true, data:user, token:accessToken})

         

    } catch (error) {
        console.log(error, "Error registering data")
         res.status(500).json({msg:"Internal server error", sucess:false})
    }


}