import { v2 as cloudinary } from 'cloudinary'
import fs from "fs";

const uploadOnCloudinary= async (file)=>{
    
    cloudinary.config({ 
      cloud_name:process.env.CLOUDINARY_NAME , 
      api_key:process.env.CLOUDINARY_API_KEY , 
      api_secret:process.env.CLOUDINARY_API_SECRET 
    });
    try{
   // Upload file
    const result = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    fs.unlinkSync(file)
        return result.secure_url
    } catch (error) {
    if (localFilePath) {
      fs.unlinkSync(localFilePath);
    }
    console.error("Cloudinary upload error:", error);
    return null;
  }
};
 export default uploadOnCloudinary