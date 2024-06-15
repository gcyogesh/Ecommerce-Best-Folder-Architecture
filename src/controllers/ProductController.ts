import { Request, Response } from "express"
import ProductModel from "../models/ProductSchema"
import passingCloudinary from "../utils/Cloudinary";
import fs from 'fs'




export const PostProducts = async (req: Request, res: Response) => {
    const { productname, productcategory, productcolor, price, description, stock, rating } = req.body;
    // image upload ko kam  
    let imageUrl = null;
    if(req.file){
        try {
            imageUrl = await passingCloudinary(req.file.path);
            console.log(imageUrl)
            fs.unlink(req.file.path, (err)=>{
                if(err){
                    console.log("Failed to delete the file", err)
                }else{
                    console.log("deleted sucessfully!")
                }
            })
        } catch (error) {
            console.log("Can't upload sucessfully");
            res.status(500).json({msg:"Can't upload image ", sucess:false})
        }
    }
    // image upload of kam vaiyo 
    try {
        const newProduct = new ProductModel({
            productname,
            productcategory,
            productcolor,
            price,
            description,
            stock,
            rating,
            imageUrl
        });
        const savedProduct = await newProduct.save();
        res.status(201).json({ msg: "Product inserted successfully", success: true, data: savedProduct });
    } catch (error) {
        console.error(error, "Error posting");
        res.status(500).json({ msg: "Internal server error", success: false });
    }
};


export const GetProducts = async(req:Request, res:Response)=>{

    try {
        const {page=1, limit = 25} = req.query;
        const skip = (parseInt(page as string)-1)* parseInt(limit as string);
        
        const product =  await ProductModel.find({}).skip(skip).limit(parseInt(limit as string)).exec();
        res.status(201).json({msg:"Get products data sucessfully",sucess:true, data:product})
        
    } catch (error) {
         console.log(error, "Error getting Product data")
         res.status(500).json({msg:"Internal server error", sucess:false})
    }

}



export const DeleteProducts = async(req:Request, res:Response)=>{
    try {
        const productId =  req.params.id;
        const DeleteData = await ProductModel.findByIdAndDelete(productId)
        if(!DeleteData){
            res.status(404).json({msg:"Problem while deleting products", sucess:false})
        }
        res.status(201).json({msg:"Product data delted sucessfully", sucess:true, data:DeleteData})
    } catch (error) {
         console.log(error,"Error while deleting data")
         res.status(500).json({msg:"Internal server error"});
    }

}

export const UpdateProducts = async(req:Request, res:Response)=>{
    try {
        const productId = req.params.id;
        const updateProduct = await ProductModel.findByIdAndUpdate(productId, req.body, {new:true});
        if(!updateProduct){
            res.status(404).json({msg:"Not able to update this thing",sucess:false})
        }
        res.status(201).json({msg:"product updated sucessfully ", sucess:true, data:updateProduct})
    } catch (error) {
        console.log(error, "Error updaing data")
        res.status(500).json({msg:"Internal server error", sucess:false})
        
    }

}

// export const SearchProducts = async (req: Request, res: Response) => {
//     const { name, category, minPrice, maxPrice, color, minRating } = req.query;
//     const query: any = {};

//     if (name) query.productname = new RegExp(name as string, 'i'); // case-insensitive search
//     if (category) query.productcategory = category;
//     if (minPrice || maxPrice) query.price = { $gte: minPrice || 0, $lte: maxPrice || Infinity };
//     if (color) query.productcolor = color;
//     if (minRating) query.rating = { $gte: minRating };

//     try {
//         const products = await ProductModel.find(query);
//         res.status(200).json({ success: true, data: products });
//     } catch (error) {
//         console.error("Error searching products:", error);
//         res.status(500).json({ success: false, msg: "Internal server error" });
//     }
// };