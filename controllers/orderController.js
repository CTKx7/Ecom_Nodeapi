import orderModel from "../model/Order.js";
import asyncHandler from "express-async-handler";
import userModel from "../model/User.js";
import productModel from "../model/Product.js";
import Stripe from "stripe";
import dotenv from "dotenv";
import couponModel from "../model/Coupon.js";
//method dotenv
dotenv.config();

//Stripe Key
const stripe = new Stripe(process.env.STRIPE_KEY);

//@description   :   Create orders
//@Route         :  Post  /api/v1/order
// @Access       :  Private

export const orderCreate = asyncHandler(async (req, res) => {
  // Get The Coupon
  //console.log(req.query);
  const { Coupon } = req?.query;

  const couponFound = await couponModel.findOne({
    Code: Coupon?.toUpperCase(),
  });
  //console.log(couponFound);
  if (couponFound?.isExppire) {
    throw new Error("Coupon Has Expired");
  }

  // if(!couponFound){
  //   throw new Error("coupon does not Exists")
  // }
  //get Discount
  const Discount = couponFound?.Discount / 100;

  //  get the payload(customer,orderItems,shippingAddress,totalPrice);
  const { User, orderItems, shippingAddress, totalPrice } = req.body;

  //console.log({ orderItems,shippingAddress,totalPrice})
  //  find the user
  const userFind = await userModel.findById(req.userAuthId);

  //Check if user has shippingAddress
  if (!userFind?.hasShippingAddress) {
    throw new Error("please Provide Shipping Address");
  }

  //  check if order is not empty
  if (orderItems <= 0) {
    throw new Error("No order Items ");
  }
  // place/create order - save into db
  const orderCreate = await orderModel.create({
    User: userFind?._id,
    orderItems,
    shippingAddress,
    totalPrice: couponFound ? totalPrice - totalPrice * Discount : totalPrice,
  });

  //console.log(orderCreate)

  // update the Product qty
  const productFind = await productModel.find({ _id: { $in: orderItems } });
  //console.log(productFind)

  orderItems?.map(async (order) => {
    const products = productFind?.find((product) => {
      return product?._id?.toString() === order?._id?.toString();
    });

    if (products) {
      products.totalSold += order.Qty;
      //products.totalQty -= products.totalSold
    }
    //console.log(products)
    await products.save();
  });
  // push Orderid into UserModel
  userFind.orders.push(orderCreate?._id);
  //resave
  await userFind.save();

  //  make payment (stripe)
  //convert order Item to Have same structure that stripe need
  const convertedOrders = orderItems?.map((item) => {
    return {
      price_data: {
        currency: "inr",
        product_data: {
          name: item?.Name,
          description: item?.Description,
        },
        unit_amount: item?.Price * 100,
      },
      quantity: item?.Qty,
    };
  });

  const session = await stripe.checkout.sessions.create({
    //row code inherite
    /*  line_items:[
        {
            price_data:{
                currency:"inr",
                product_data:{
                    name:"Hat",
                    description:"Best Hat"
                },
                unit_amount : 10*100
            },
            quantity:2,
        },
    
    ],*/

    line_items: convertedOrders,
    metadata: {
      orderId: JSON.stringify(orderCreate?._id),
    },
    mode: "payment",
    success_url: "http://localhost:3000/success",
    cancel_url: "http://localhost:3000/Cancel",
  });

  res.send({ url: session.url });
  //  payment webhook
  //  update the user order

  /*res.json({
    success:true,
    message: "order created",
    orderCreate,
    userFind
})*/
});

//@description   :   GetAll orders
//@Route         :   Get  /api/v1/getallorders
//@Access        :   Private/admin

export const getAllOrders = asyncHandler(async (req, res) => {
  //find all orders
  const orderFind = await orderModel.find();

  res.json({
    status: "success",
    message: "get all Order",
    orderFind,
  });
});

//@description   :   Get single orders
//@Route         :   Get  /api/v1/getsingleorders/:id
//@Access        :   Private/admin

export const getSingleOrder = asyncHandler(async (req, res) => {
  //find single order
  const id = req.params.id;
  const singleOrderFind = await orderModel.findById(id);
  res.status(200).json({
    success: true,
    message: "single Order",
    singleOrderFind,
  });
});

//@description   :   Update order Status to Deleverd
//@Route         :   Get  /api/v1/ordersupdate/:id
//@Access        :   Private/admin

export const updateOrderStatus = asyncHandler(async (req, res) => {
  // get the id From paarams
  const id = req.params.id;

  //update order
  const updateOrder = await orderModel.findByIdAndUpdate(
    id,
    {
      Status: req.body.Status,
    },
    { new: true }
  );

  res.status(200).json({
    success: true,
    message: "order status update",
    updateOrder,
  });
});

//@description   :  Get sales sum of orders
//@Route         :   Get  /api/v1/orders/sales/sum
//@Access        :   Private/admin

export const getOrderStats = asyncHandler(async (req, res) => {
  // get order Stats
  const orders = await orderModel.aggregate([
    {
      $group: {
        _id: null,
        minimumSales: {
          $min: "$totalPrice",
        },
        totlSales: {
          $sum: "$totalPrice",
        },
        maximumSales: {
          $max: "$totalPrice",
        },
        averageSale: {
          $avg: "$totalPrice",
        },
      },
    },
  ]);

  const date = new Date();
  const today = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  //console.log(today)
  const saleToday = await orderModel.aggregate([
    {
      $match: {
        createdAt: {
          $gte: today,
        },
      },
    },
    {
      $group: {
        _id: null,
        totalSales: {
          $sum: "totalPrice",
        },
      },
    },
  ]);

  res.status(200).json({
    success: true,
    message: "Sum of Orders",
    orders,
    saleToday,
  });
});
