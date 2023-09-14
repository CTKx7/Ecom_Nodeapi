import express from 'express';
import { createCoupon, deleteCoupon, getAllCoupons, getSingleCoupon, updateCoupon } from '../controllers/couponController.js';
import { isLoggedIn } from '../middlewares/isLoggedIn.js';
import isAdmin from '../middlewares/isAdmin.js';

const couponRouter = express.Router();

couponRouter.post("/coupon",isLoggedIn,isAdmin, createCoupon);
couponRouter.get("/allCoupons",isLoggedIn, getAllCoupons);
couponRouter.get("/singleCoupon/:id",isLoggedIn, getSingleCoupon);
couponRouter.put("/updateCoupon/:id",isLoggedIn,isAdmin, updateCoupon);
couponRouter.delete("/deleteCoupon/:id",isLoggedIn,isAdmin, deleteCoupon);


export default couponRouter;