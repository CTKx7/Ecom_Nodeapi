import express from 'express';
import { getAllOrders, getOrderStats,  getSingleOrder, orderCreate, updateOrderStatus } from '../controllers/orderController.js';
import { isLoggedIn } from '../middlewares/isLoggedIn.js';

const orderRouter = express.Router();

orderRouter.post("/order",isLoggedIn, orderCreate);
orderRouter.get("/getallorders",isLoggedIn,getAllOrders);
orderRouter.get("/getsingleorder/:id",isLoggedIn,getSingleOrder);
orderRouter.put("/ordersupdate/:id",isLoggedIn,updateOrderStatus);
orderRouter.get("/orders/sales/status",isLoggedIn,getOrderStats);

export default orderRouter;