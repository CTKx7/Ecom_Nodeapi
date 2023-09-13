import express from 'express';
import { isLoggedIn } from '../middlewares/isLoggedIn.js';
import { createCategory, deleteCategory, getSingleCataegory, getallCategory, updateCategory } from '../controllers/categoryController.js';
import multer from 'multer';


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

categoryRouter.post("/category" , isLoggedIn,uploadCategory.single("Image"), createCategory );
categoryRouter.put("/updateCategory/:id", isLoggedIn,updateCategory);
categoryRouter.get("/getallCategory", getallCategory);
categoryRouter.get("/getsinglecategory/:id", getSingleCataegory);
categoryRouter.delete("/categoryDelete/:id",deleteCategory)

export default categoryRouter;