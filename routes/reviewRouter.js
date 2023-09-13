import express from 'express';
import { createReview } from '../controllers/reviewsController.js';
import { isLoggedIn } from '../middlewares/isLoggedIn.js';

const reviewRouter = express.Router();

reviewRouter.post("/review/:productId",isLoggedIn, createReview);

export default reviewRouter;