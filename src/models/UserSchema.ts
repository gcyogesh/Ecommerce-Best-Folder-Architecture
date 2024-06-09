import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username:{
        type:String,
    },
    email:{
        type:String,
        unique:true
    },
    password:{
        type:String
    },
    age:{
        type:Number
    }


})

const UserModel = mongoose.model('Users', UserSchema);

export default UserModel;