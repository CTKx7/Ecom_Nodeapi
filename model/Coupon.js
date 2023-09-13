import mongoose from "mongoose";

const couponSchema = new mongoose.Schema(
  {
    Code: {
      type: String,
      required: true,
    },

    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    Discount: {
      type: Number,
      required: true,
      default: 0,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

// coupon is Expired
couponSchema.virtual("isExpired").get(function () {
  return this.endDate < Date.now();
});

couponSchema.virtual("daysLeft").get(function () {
  //1000 mens 1sec * 60 mens 60 minuts * 60 mens hour *24 mens 1day
  const daysLeft = Math.ceil((this.endDate - Date.now()) / (1000*60*60*24)) +" "+ 'Days Left';
  return daysLeft;
});

// validation

couponSchema.pre("validate", function (next) {
  if (this.endDate < this.startDate) {
    next(new Error("End Date Cannot Be less then the Start Date"));
  }
  next();
});

couponSchema.pre("validate", function (next) {
  if (this.startDate < Date.now()) {
    next(new Error("Start Date Cannot Be less then Today"));
  }
  next();
});

couponSchema.pre("validate", function (next) {
  if (this.endDate < Date.now()) {
    next(new Error("End Date Cannot Be less then Today"));
  }
  next();
});

couponSchema.pre("validate", function (next) {
  if (this.Discount <= 0 || this.Discount > 100) {
    next(new Error("Discount Can NOt be less than 0 or greater than 100"));
  }
  next();
});

const couponModel = mongoose.model("Coupon", couponSchema);

export default couponModel;
