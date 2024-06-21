import passport from '../config/passport'
import { NextFunction, Request, Response } from 'express';

export const googleAuthHandler =  passport.authenticate("google", {scope : ["profile", "email"]});

export const googleAuthCallbackHandler = passport.authenticate("google", {
    successRedirect: "http://localhost:5173/dashboard",        // Sucess vayesi janay thau
    failureRedirect: "http://localhost:5173/login"    
})


export const loginSucessHandler = (req:Request, res:Response)=>{
    if (req.user) {  
        res.status(200).json({ msg: "User login success", user: req.user });
    } else {
        res.status(400).json({ msg: "Not authorized" });
    }

}


export const logoutHandler = (req:Request, res:Response, next:NextFunction)=>{
    req.logout(function (err){
        if(err){
            return next(err)
        }

        res.redirect("http://localhost:5173/")
    })
}