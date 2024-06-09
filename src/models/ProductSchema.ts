import mongoose from "mongoose";


const ProductSchema = new mongoose.Schema({
    productname:{
        type:String,
        required:true,
    },
    productcategory:{
        type:String,
        required:true
    },
    productcolor:{
        type:String,
        required:true
    },  
    price:{
        type:Number,
        required:true
    },
    description :{
       type:String
    },
    stock:{
        type:Number,
    },
    rating:{
        type:Number,

    },
    imageUrl:{
        type:String,
        required:true
    }
    
    
    }, {timestamps:true})


const ProductModel = mongoose.model('Product', ProductSchema);

export default ProductModel;