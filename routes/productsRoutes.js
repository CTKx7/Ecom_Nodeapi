import express from 'express';
import { updateProduct, createProduct, getProducts, getSingleProduct, DeleteProduct } from '../controllers/productsContoller.js';
import { isLoggedIn } from '../middlewares/isLoggedIn.js';
import multer from 'multer';
import isAdmin from '../middlewares/isAdmin.js';



// Product Module 
// Save images in DB and Create Folder In backEnd 

const StorageProduct = multer.diskStorage({
    destination :"imagesSave/uploadsProduct/",
    filename:(req,file,cb)=>{
    cb(null,`${Date.now()}--${file.originalname}`);
    },
}); 

const uploadProduct = multer({
    storage:StorageProduct, 
});

//Routes
const productRouter = express.Router();

productRouter.post("/product", isLoggedIn, isAdmin , uploadProduct.array("Images"), createProduct);
productRouter.get("/Product",isLoggedIn ,getProducts);   
productRouter.get("/Product/:id", getSingleProduct);
productRouter.put("/Product/:id",isLoggedIn,isAdmin , updateProduct);
productRouter.delete("/ProductDelete/:id",isLoggedIn, DeleteProduct);

export default productRouter;