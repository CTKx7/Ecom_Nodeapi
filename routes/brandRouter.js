import express from 'express';
import { isLoggedIn } from '../middlewares/isLoggedIn.js';
import { createBrand, deleteBrand, getSingleBrand, getallBrand, updateBrand } from '../controllers/brandController.js';
import isAdmin from '../middlewares/isAdmin.js';


const brandRouter = express.Router();

brandRouter.post("/brand" , isLoggedIn,isAdmin, createBrand );
brandRouter.put("/updateBrand/:id", isLoggedIn,isAdmin,updateBrand);
brandRouter.get("/allBrand", getallBrand);
brandRouter.get("/singleBrand/:id", getSingleBrand);
brandRouter.delete("/deleteBrand/:id",isAdmin,deleteBrand)

export default brandRouter;