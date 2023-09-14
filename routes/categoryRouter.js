import express from 'express';
import { isLoggedIn } from '../middlewares/isLoggedIn.js';
import { createCategory, deleteCategory, getSingleCataegory, getallCategory, updateCategory } from '../controllers/categoryController.js';
import multer from 'multer';
import isAdmin from '../middlewares/isAdmin.js';


const StorageCategory = multer.diskStorage({
    destination :"imagesSave/uploadsCategory/",
    filename:(req,file,cb)=>{
    cb(null,`${Date.now()}--${file.originalname}`);
    },
}); 

const uploadCategory = multer({
    storage:StorageCategory, 
});



const categoryRouter = express.Router();

categoryRouter.post("/category" , isAdmin, isLoggedIn,uploadCategory.single("Image"), createCategory );
categoryRouter.put("/updateCategory/:id",isAdmin, isLoggedIn,updateCategory);
categoryRouter.get("/allCategory", getallCategory);
categoryRouter.get("/singlecategory/:id", getSingleCataegory);
categoryRouter.delete("/deleteCategory/:id",isAdmin, deleteCategory)

export default categoryRouter;