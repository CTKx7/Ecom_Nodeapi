import mongoose from "mongoose";

const colorSchema = mongoose.Schema(
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

  },
  { timestamps: true }
);

const colorModel = mongoose.model("Color", colorSchema);

export default colorModel;
