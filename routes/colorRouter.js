import express from 'express';
import { isLoggedIn } from '../middlewares/isLoggedIn.js';
import { createColor, deletecolor, getSingleColor, getallColor, updateColor } from '../controllers/colorController.js';
import isAdmin from '../middlewares/isAdmin.js';



const colorRouter = express.Router();

colorRouter.post("/color" , isLoggedIn,isAdmin, createColor );
colorRouter.put("/updateColor/:id", isLoggedIn,isAdmin ,updateColor);
colorRouter.get("/getallColor", getallColor);
colorRouter.get("/getsingleColor/:id", getSingleColor);
colorRouter.delete("/colorDelete/:id",isAdmin ,deletecolor)

export default colorRouter;