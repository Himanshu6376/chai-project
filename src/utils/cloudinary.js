import {v2 as cloudinary} from "cloudinary"
import { response } from "express";
import fs from "fs"

    
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
});


const uploadOnCloudinary = async (localFilePath) => {
    try {
        if(!localFilePath) return null
        // upload the file on cloudinary
        const reponse = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        // file has been uploaded sucessfull
        console.log("file is uploaded on cloudinary", reponse.url);
        return response;
    } catch (error) {
        fs.unlinkSync(localFilePath) // remove the locally saves temprary file as the upload operation got failed
        return null;
        
    }
}
    
export {uploadOnCloudinary}