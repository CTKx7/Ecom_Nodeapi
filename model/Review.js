import mongoose from 'mongoose';

const reviewsSchema = mongoose.Schema({

User:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:[true, "Review Must Belong To a User"]
},

Product:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Product",
    required:[true, " Review Must belong To A Product"]
},

Message:{
    type:String,
    required:[true, "please Add A review"]   
},

Rating:{
    type:Number,
    required:[true, "Plese Add a rating Between 1 and 5 "],
    min:1,
    max:5
}

},{timestamps:true});

const reviewModel = mongoose.model("Review",reviewsSchema );

export default reviewModel;