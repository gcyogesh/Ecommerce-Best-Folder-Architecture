import { Request, Response, NextFunction } from "express";
import { check, validationResult } from "express-validator";

export const ProductValidator = ()=>{
    return [
        check('productname').notEmpty().withMessage("Product name is required"),
        check('productcategory').notEmpty().withMessage("Productcategory is required"),
        check('productcolor').notEmpty().withMessage("mention color too"),
        check('price').notEmpty().withMessage("Price is required").isNumeric().withMessage("Price must be a number"),
        check('description').optional().isString().withMessage("Description must be a string"),
        check('stock').optional().isInt({ min: 0 }).withMessage("Stock must be a non-negative integer"),
        check('rating').optional().isInt({ min: 0, max: 5 }).withMessage("Rating must be an integer between 0 and 5"),
        check('imageUrl').optional().isURL().withMessage("Invalid image URL format")
        
    ]
}


export const validate  = (req:Request, res:Response, next:NextFunction)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({sucess:false, errors:errors.array()});
    }
  next()
}