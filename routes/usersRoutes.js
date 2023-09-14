import express from 'express';
import {  getUserProfileCtrl, registerUserCtrl, updateShippingAddress, userLoginCtrl } from '../controllers/usersController.js';
import { isLoggedIn } from '../middlewares/isLoggedIn.js';
import isAdmin from '../middlewares/isAdmin.js';


const userRoutes = express.Router();

//user Routes
userRoutes.post('/user/register', registerUserCtrl);
userRoutes.post('/user/login', userLoginCtrl);
userRoutes.get('/user/profile', isLoggedIn,isAdmin, getUserProfileCtrl);
userRoutes.put('/user/update/shipping', isLoggedIn, updateShippingAddress)

export default userRoutes;