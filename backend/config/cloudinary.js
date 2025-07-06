import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

import dotenv from 'dotenv';
dotenv.config();

const uploadOnCloudinary = async (filepath) =>{
    cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

     try{
      const uploadResult = await cloudinary.uploader
       .upload(filepath)
       .catch((error) => {
           console.log(error);
       });

       fs.unlinkSync(filepath);
       return uploadResult?.secure_url;
     }
     catch(err){
        fs.unlinkSync(filepath);
      console.log(err);
      
     }
}

export default uploadOnCloudinary;