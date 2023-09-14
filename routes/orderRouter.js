import express from 'express';
import { getAllOrders, getOrderStats,  getSingleOrder, orderCreate, updateOrderStatus } from '../controllers/orderController.js';
import { isLoggedIn } from '../middlewares/isLoggedIn.js';
import isAdmin from '../middlewares/isAdmin.js';

const orderRouter = express.Router();

orderRouter.post("/order",isLoggedIn, orderCreate);
orderRouter.get("/allorders",isLoggedIn,getAllOrders);
orderRouter.get("/singleorder/:id",isLoggedIn,getSingleOrder);
orderRouter.put("/updateOrderStatus/:id",isLoggedIn,isAdmin, updateOrderStatus);
orderRouter.get("/orders/sales/status",isLoggedIn,isAdmin, getOrderStats);

export default orderRouter;