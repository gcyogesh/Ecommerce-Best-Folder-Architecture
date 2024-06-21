import mongoose from "mongoose";




const AuthSchema = new mongoose.Schema({
    googleId:String, 
    displayName:String, 
    email:String,
    image:String,
}, {timestamps:true})

const AuthModel = mongoose.model('AuthUsers', AuthSchema)

export default AuthModel;
