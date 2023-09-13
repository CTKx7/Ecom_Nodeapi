import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({

  fullName:{
    type:String,
    required:true,
  },

  email:{
    type:String,
    required:true
  },

  password:{
    type:String,
    required:true
  },

  orders:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Order",
  }],

  wishList:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"WishList",
  }],

  isAdmin:{
    type:Boolean,
    default:false
  },

  hasShippingAddress:{
        type:Boolean,
        default:false
  },


  shippingAddress:{

     firstName:{
            type:String,            
     },

     lastName:{
        type:String,      
     },

     Address:{
        type:String,       
     },

     City:{
        type: String,
     },

     postalCode:{
        type:String,        
     },

     Country:{
        type:String,     
     },

     phoneNumber:{
        type:Number,    
     }
  },

},{timestamps:true});


//Complete the Schema To model

const userModel = mongoose.model("User", userSchema);

export default userModel;