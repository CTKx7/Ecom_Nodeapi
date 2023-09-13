import brandModel from "../model/Brand.js";
import asyncHandler from "express-async-handler";

// description    :  Create Brand
// @Routes        :  POST  api/v1/brand
// access         :  private/Admin

export const createBrand = asyncHandler(async (req,res)=>{
const {Name, User} = req.body;

//Category found
const brandFound = await brandModel.findOne({Name});
if(brandFound){
    throw new Error("Brand Already Exists");
}else{
    //create category
        const brandCreate = await brandModel.create({
            Name: Name.toLowerCase(),
            User: req.userAuthId
        });

        res.json({
            status: "Success",
            message : "Brand Created",
            brandCreate
        })
}

});

// description  :  Get all brand
// @routes      :  Get /api/v1/getallBrand
// @access      :  Public

export const getallBrand = async (req, res)=>{
    try {

        const Brands = await brandModel.find();
        res.json({
            status : "success",
            message : "Brand Fetched successfully",
            Brands
        })
        
    } catch (e) {
        res.status(404).send({error:e?.message});
    }

}

// description : get single Brand
// @routes     : Get /api/v1/getsingleBrand
// @access     : public 

export const getSingleBrand = async (req, res)=>{

    try {
        const getsingledata = await brandModel.findById(req.params.id);
        res.json({
            status : "success",
            message : "Single data fatched Successfully",
            getsingledata
         })
    } catch (e) {
            res.status(404).send({error:e?.message})
    }
}

//description  : brand Update
//@routes      : put /api/v1/updateBrand
// @access     : private/ Admin
export const updateBrand = asyncHandler(async(req , res )=>{

    const {Name} = req.body;

    const updateData = await brandModel.findByIdAndUpdate(req.params.id,{Name},{new:true});

    res.json({
        status: "success",
        message : "Brand Updated successFully",
        updateData
    })
});

   // description : delete Brand
   //@routes      : delete /api/v1/brandDelete
   // @ access    : private/ Admin


export const deleteBrand  = asyncHandler(async(req, res)=>{
     try {
      
        const deleteData = await brandModel.findByIdAndDelete(req.params.id);        
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