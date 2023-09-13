import asyncHandler from "express-async-handler";
import productModel from "../model/Product.js";
import reviewModel from "../model/Review.js";

//description   :  Create Review
// @router      :  /api/v1/review
// @access      :  Private/Admin

export const createReview = asyncHandler(async(req, res)=>{

  const {Product ,Message,Rating} = req.body;  
    //console.log(req.params) 
const {productId} = req.params;
const productFind = await productModel.findById(productId).populate("Reviews");
//console.log(productFind);

if(!productFind){
    throw new Error("Product Not Found")
}
//check if User already reviewed this Product
const hasReviewed = productFind?.Reviews?.find((review)=>{
   // console.log(review)
    return review?.User?.toString() === req?.userAuthId?.toString();
})
//console.log(hasReviewed)
if(hasReviewed){
    throw new Error("You Have Already Reviewed This Product")
}
//Create Review 
const productCreate = await reviewModel.create({
User:req.userAuthId,
Product: productFind._id,
Message,
Rating

});

// push review into ProductModel Found
productFind.Reviews.push(productCreate?._id);
//resave
 await productFind.save();

res.status(201).json({
    
    status: true,
    message: "Review Created Successfully" ,
    productCreate
})

})