import userModel from "../model/User.js";
import bcrypt from "bcryptjs";
import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import { getTokenFromHeader } from "../utils/getTokenFromHeader.js";
import { verifyToken } from "../utils/verifyToken.js";

// @desc      Register User
// @route     Post /api/v1/users/register
// @access    Private

export const registerUserCtrl = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    //check user exists
    const userExists = await userModel.findOne({ email });
    if (userExists) {
      res.json({ msg: "User Already Exists" });
    }

    //hash Password

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //Create User

    const userCreate = await userModel.create({
      fullName,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      status: "success",
      message: "user Created Successfully",
      data: userCreate,
    });
  } catch (e) {
    res.status(404).send({ error: e?.message });
  }
};

// @desc      Login User
// @route     Post /api/v1/users/login
// @access    Public

export const userLoginCtrl = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // Find The User In Db by Email

  const userFound = await userModel.findOne({ email });

  if (userFound && (await bcrypt.compare(password, userFound?.password))) {
    res.status(201).json({
      status: "success",
      message: "User Login Successfully",
      userFound,
      token: generateToken(userFound?._id),
    });
  } else {
    throw new Error("Invalid Login Details");
  }
});

// @desc      Get User Profile
// @route     Get /api/v1/users/profile
// @access    Private

export const getUserProfileCtrl = asyncHandler(async (req, res) => {
const user = await userModel.findById(req.userAuthId).populate("orders");
//console.log(user);
res.json({
  status:"success",
  message: "User Profile Fatched",
  user
})

  //all code is use in  create jwt token
  //postman headers pass on console.log()
  //console.log(req.headers)
  //const token = getTokenFromHeader(req);
  //console.log(token)

  // Verify Token
  //const verify = verifyToken(token);
  //console.log(req)
 
});

// @desc     Update User Shipping Address
// @route     Put /api/v1/users/update/shipping
// @access    Private

export const updateShippingAddress = asyncHandler(async (req, res) => {
  const {
    firstName,
    lastName,
    Address,
    City,
    postalCode,
    Country,
    phoneNumber,
  } = req.body;

  const userUpdate = await userModel.findByIdAndUpdate(
    req.userAuthId,
    {
     shippingAddress: {
        firstName,
        lastName,
        Address,
        City,
        postalCode,
        Country,
        phoneNumber,
      },
      hasShippingAddress: true,
    },
    { new: true }
  );

  res.json({
    status: "success",
    message: "user Shipping Address Updated SuccessFully",
    userUpdate,
  });
});
