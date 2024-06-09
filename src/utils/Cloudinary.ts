import { v2 as cloudinary } from "cloudinary";


 // Configuration

 
 cloudinary.config({ 
     cloud_name: process.env.CLOUD_NAME,
     api_key: process.env.API_KEY, 
     api_secret: process.env.API_SECRET // Click 'View Credentials' below to copy your API secret
    });
    
    
    const passingCloudinary = async(imagePath:string)=>{
       
            try {
                const uploadResult = await cloudinary.uploader.upload(imagePath);
                return uploadResult.secure_url;
            } catch (error) {
                console.error(error);
                throw new Error('Failed to upload image to Cloudinary');
            }
        }
        
    

    export default passingCloudinary;