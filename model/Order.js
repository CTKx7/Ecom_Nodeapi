import mongoose from "mongoose";

//Generate Random Number for the Order
const randomTxt = Math.random().toString(36).substring(7).toLocaleUpperCase();
const randomNumber = Math.floor(1000 + Math.random() * 9000);

const orderSchema = mongoose.Schema(
  {
    User: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    orderItems: [
      {
        type: Object,
        required: true,
      },
    ],

    shippingAddress: {
      type: Object,
      required: true,
    },
    orderNumber: {
      type: String,
      required: true,
      default: randomTxt + randomNumber,
    },

    /// for stripe payment
    paymentStatus: {
      type: String,
      default: "Not Paid",
    },
    paymentMethod: {
      type: String,
      default: "not Specified",
    },
    totalPrice: {
      type: Number,
      default: 0.0,
    },

    Currency: {
      type: String,
      default: "not Specified",
    },

    //for Admin
    Status: {
      type: String,
      default: "Panding",
      enum: ["Panding", "Processing", "Shipped", "Delivered"],
    },

    deliveredAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

const orderModel = mongoose.model("Order", orderSchema);
export default orderModel;
