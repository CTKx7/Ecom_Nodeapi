import express from 'express';
import {  getUserProfileCtrl, registerUserCtrl, updateShippingAddress, userLoginCtrl } from '../controllers/usersController.js';
import { isLoggedIn } from '../middlewares/isLoggedIn.js';


const userRoutes = express.Router();

//user Routes
userRoutes.post('/user/register', registerUserCtrl);
userRoutes.post('/user/login', userLoginCtrl);
userRoutes.get('/user/profile', isLoggedIn, getUserProfileCtrl);
userRoutes.put('/user/update/shipping', isLoggedIn, updateShippingAddress)

export default userRoutes;