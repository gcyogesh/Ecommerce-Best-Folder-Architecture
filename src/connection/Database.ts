import mongoose from "mongoose";


const DB = process.env.MONGO_URL || ''
const Connection = ()=>{
    mongoose.connect(DB).then(()=>{
          console.log("Sucessfully connected DB")
    }).catch((err)=>{
        console.log(err, "Error connecting db hai")
    })
}

export default Connection;