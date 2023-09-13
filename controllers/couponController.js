import asyncHandler from "express-async-handler";
import couponModel from "../model/Coupon.js";

//description : create NEw Coupon
//@Routes     : post api/v1/createCoupon
//@access     : Private / Admin

export const createCoupon = asyncHandler(async (req, res) => {
  //console.log(req.body);
  const { Code, startDate, endDate, Discount, userId } = req.body;
  //check if Admin
  //check if coupon already Exists
  const couponExists = await couponModel.findOne({ Code });
  // console.log(couponExists);
  if (couponExists) {
    throw new Error("Coupon Already Exists");
  }

  if (isNaN(Discount)) {
    throw new Error("Discount Value must Be a Number");
  }

  //create the coupon
  const createCoupon = await couponModel.create({
    Code: Code?.toUpperCase(),
    startDate,
    endDate,
    Discount,
    userId: req.userAuthId,
  });
  //console.log(createCoupon)
  res.json({
    success: true,
    message: "coupon Created",
    createCoupon,
  });
});

// @description    :   Get All Coupons
// @Routes         :   Get Api/V1/GetAllCoupon
// @access         :  Private/Admin

export const getAllCoupons = asyncHandler(async (req, res) => {
  const getCoupons = await couponModel.find();
  res.json({
    status: "success",
    message: "get All Coupons",
    getCoupons,
  });
});

// @description    :   Get All Coupons
// @Routes         :   Get Api/V1/GetSingleCoupon
// @access         :   Private/Admin

export const getSingleCoupon = asyncHandler(async (req, res) => {
  const singleCoupon = await couponModel.findById(req.params.id);
  res.json({
    success: true,
    message: "Single Coupon Is Fatched",
    singleCoupon,
  });
});

//description : update  Coupon
//@Routes     : post api/v1/updateCoupon
//@access     : Private / Admin

export const updateCoupon = asyncHandler(async (req, res) => {
  const { Code, startDate, endDate, Discount } = req.body;

  if (isNaN(Discount)) {
    throw new Error("Discount Value must Be a Number");
  }

  const updateData = await couponModel.findByIdAndUpdate(req.params.id, {
    Code: Code?.toUpperCase(),
    startDate,
    endDate,
    Discount,
  },{new:true});

  res.json({
    success: true,
    message: "Coupon Is Update",
    updateData
  });
});

//description : dekete  Coupon
//@Routes     : post api/v1/deleteCoupon
//@access     : Private / Admin

export const deleteCoupon = asyncHandler(async(req, res)=>{
const deleteCoupon = await couponModel.findByIdAndDelete(req.params.id);
res.json({
  ststus : "success",
  message : "Delete Coupon"
})

});