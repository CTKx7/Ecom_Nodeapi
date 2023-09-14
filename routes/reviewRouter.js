import express from 'express';
import { createReview } from '../controllers/reviewsController.js';
import { isLoggedIn } from '../middlewares/isLoggedIn.js';
import isAdmin from '../middlewares/isAdmin.js';

const reviewRouter = express.Router();

reviewRouter.post("/review/:productId",isLoggedIn,isAdmin, createReview);

export default reviewRouter;