import colorModel from "../model/Color.js";
import asyncHandler from "express-async-handler";

// description    :  Create Color
// @Routes        :  POST  api/v1/color
// access         :  private/Admin

export const createColor = asyncHandler(async (req,res)=>{
const {Name, User} = req.body;

//Category found
const colorFound = await colorModel.findOne({Name});
if(colorFound){
    throw new Error("Brand Already Exists");
}else{
    //create category
        const colorCreate = await colorModel.create({
            Name: Name.toLowerCase(),
            User: req.userAuthId
        });

        res.json({
            status: "Success",
            message : "Color Created",
            colorCreate
        })
}

});

// description  :  Get all Color
// @routes      :  Get /api/v1/getallColor
// @access      :  Public

export const getallColor = async (req, res)=>{
    try {

        const Colors = await colorModel.find();
        res.json({
            status : "success",
            message : "Color Fetched successfully",
            Colors
        })
        
    } catch (e) {
        res.status(404).send({error:e?.message});
    }

}

// description : get single Color
// @routes     : Get /api/v1/getsingleColor
// @access     : public 

export const getSingleColor = async (req, res)=>{

    try {
        const getsingledata = await colorModel.findById(req.params.id);
        res.json({
            status : "success",
            message : "Single data fatched Successfully",
            getsingledata
         })
    } catch (e) {
            res.status(404).send({error:e?.message})
    }
}

//description  : Color Update
//@routes      : put /api/v1/updatecolor
// @access     : private/ Admin
export const updateColor = asyncHandler(async(req , res )=>{

    const {Name} = req.body;

    const updateData = await colorModel.findByIdAndUpdate(req.params.id,{Name},{new:true});

    res.json({
        status: "success",
        message : "Color Updated successFully",
        updateData
    })
});

   // description : delete Color
   //@routes      : delete /api/v1/colorDelete
   // @ access    : private/ Admin


export const deletecolor  = asyncHandler(async(req, res)=>{
     try {
      
        const deleteData = await colorModel.findByIdAndDelete(req.params.id);        
        if(deleteData){
            res.json({
                status: "success",
                message: "Delete Data Successfully"
            })
        }else{
            res.status(404).send("Unable To Delete Data !!!")
        }
     } catch (e) {
        res.status(404).send({error:e?.message})
     }
})