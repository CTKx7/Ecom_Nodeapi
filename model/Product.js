import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    Name: {
      type: String,
      required: true,
    },

    Description: {
      type: String,
      required: true,
    },

    Brand: {
      type: String,
      required: true,
    },

    Category: {
      type: String,
      ref:"Category",
      required: true,
    },

    Sizes: [{
      type: [String],
      enum: ["S", "M", "L", "XL", "XXL"],
      required: true,
    }],
    Colors: {
      type: [String],
      required: true,
    },

    User: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    Images: [
      {
        type: String,
       required:true
      },
    ],

    Reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
    Price: {
      type: Number,
      required: true,
    },

    totalQty: {
      type: Number,
      required: true,
    },

    totalSold: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true, toJSON:{ virtuals: true } }
);
//Virtuals

// totalqty Left
productSchema.virtual("totalQtyLeft").get(function(){

  const product = this ;
  return product.totalQty - product.totalSold
});


//Total Rating
productSchema.virtual("totalReviews").get(function(){
  //console.log("this", this )
  const Product = this;
  return Product.Reviews?.length;
});

//Average Reating
productSchema.virtual("AverageRating").get(function(){
  let ratingsTotal= 0;
  const Product=this;
  Product?.Reviews?.forEach((review)=>{
    ratingsTotal+=review?.Rating;
    
  })

  //calculate avrage Rating
  const averageRating = Number(ratingsTotal/Product?.Reviews?.length).toFixed(1) ;
  return averageRating;
})

const productModel = mongoose.model("product", productSchema);

export default productModel;
