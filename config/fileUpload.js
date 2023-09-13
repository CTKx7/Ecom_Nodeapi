import cloudinaryPackage from 'cloudinary';
import multer from 'multer';
import {CloudinaryStorage} from 'multer-storage-cloudinary';
import streamifier from 'streamifier'


//const cloudinary= require('cloudinary').v2
const cloudinary = cloudinaryPackage.v2

//configure cloudinary

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_NAME, 
    api_key:  process.env.CLOUDINARY_API_KEY, 
    api_secret:process.env.CLOUDINARY_SECRET_KEY,
    CLOUDINARY_url : process.env.CLOUDINARY_url
   
  });

  // create storege engine for multer
  const storageCloud = new CloudinaryStorage({
    cloudinary,
    allowedFormats: ['jpg', 'png', 'jpeg'],
    params: {
      folder: "EComProject",
    },  

  });



  // InIt multer with storage engine
  const uploadFile = multer({
    storageCloud
  });


