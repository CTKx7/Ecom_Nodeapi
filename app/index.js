import express from "express";
import dotenv from "dotenv";
import {
  globalErrorHandler,
  notFound,
} from "../middlewares/globalErrorHandler.js";
import productRouter from "../routes/productsRoutes.js";
import categoryRouter from "../routes/categoryRouter.js";
import brandRouter from "../routes/brandRouter.js";
import colorRouter from "../routes/colorRouter.js";
import reviewRouter from "../routes/reviewRouter.js";
import orderRouter from "../routes/orderRouter.js";
import Stripe from "stripe";
import cors from "cors";
import dbConnect from "../config/dbConnect.js";
import userRoutes from "../routes/usersRoutes.js";
import orderModel from "../model/Order.js";
import couponRouter from "../routes/couponRouter.js";
//import mongoose from "mongoose";

//env file config For .env File DB_Url
dotenv.config();

//dbConnect From dbConnect.js File
dbConnect();

//Port Config To Serve.js File
const app = express();

//stripe WebHook

const stripe = new Stripe(process.env.STRIPE_KEY);

// This is your Stripe CLI webhook secret for testing your endpoint locally.
const endpointSecret =
  "whsec_0ffaba4efdd79a1af74f2a5e5f3d13fe8098300bfafdebd0b2614be17d072be3";

app.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  async (request, response) => {
    const sig = request.headers["stripe-signature"];

    let event;

    try {
      event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
      //console.log("event");
    } catch (err) {
      //console.log("err",err.message);
      response.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    if (event.type === "checkout.session.completed") {
      //update the order
      const session = event.data.object;
      const { orderId } = session.metadata;
      const paymentStatus = session.payment_status;
      const paymentMethod = session.payment_method_types[0];
      const totalAmount = session.amount_total;
      const Currency = session.currency;
      // console.log({ orderId,paymentStatus,paymentMethod,totalAmount,currency,});
      // console.log({session});

      // find the order

      const orderFind = await orderModel.findByIdAndUpdate(JSON.parse(orderId), {
        totalPrice:totalAmount / 100,
        Currency,paymentMethod,paymentStatus
      },{new:true});

      //console.log(orderFind)
    } else {
      return;
    }

    // Handle the event
    /*switch (event.type) {
      case "payment_intent.succeeded":
        const paymentIntentSucceeded = event.data.object;
        console.log(paymentIntentSucceeded);
        // Then define and call a function to handle the event payment_intent.succeeded
        break;
      // ... handle other event types
      default:
        console.log(`Unhandled event type ${event.type}`);
    }*/

    // Return a 200 response to acknowledge receipt of the event
    response.send();
  }
);

//pass incoming Data
app.use(express.json());
app.use(cors());

//Routes for user
app.use("/api/v1/", userRoutes);
// Routes for Products
app.use("/api/v1/", productRouter);

// Routes for Category
app.use("/api/v1/", categoryRouter);

// Routes For Brand
app.use("/api/v1/", brandRouter);

//Routes For Color
app.use("/api/v1/", colorRouter);

// Router For Review
app.use("/api/v1/", reviewRouter);

// Router For Orders
app.use("/api/v1/", orderRouter);

//Router for Coupon
app.use("/api/v1/", couponRouter);

// use error Hendler middleware
app.use(notFound);
app.use(globalErrorHandler);

export default app;
