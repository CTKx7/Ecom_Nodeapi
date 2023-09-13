import mongoose from "mongoose";

const brandSchema = mongoose.Schema(
  {
    Name: {
      type: String,
      required: true,
    },
    User: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    Image: {
      type: String,
      default: "https://picsum.photos/200/300",
    },

    Products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
  },
  { timestamps: true }
);

const brandModel = mongoose.model("Brand", brandSchema);

export default brandModel;
