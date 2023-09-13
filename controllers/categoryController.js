import categoryModel from "../model/Category.js";
import asyncHandler from "express-async-handler";

// description    :  Create Category
// @Routes        :  POST  api/v1/category
// access         :  private/Admin

export const createCategory = asyncHandler(async (req,res)=>{
const {Name,Image, User} = req.body;

//Category found
const categoryFound = await categoryModel.findOne({Name});
if(categoryFound){
    throw new Error("Category Already Exists");
}else{
    let Image = req?.file?.filename;
    //create category
        const createCategory = await categoryModel.create({
            Name: Name.toLowerCase(),
            Image:Image,
            User: req.userAuthId
        });

        res.json({
            status: "Success",
            message : "Category Created",
            createCategory
        })
}

});

// description  :  Get all Categories
// @routes      :  Get /api/v1/getallCategory
// @access      :  Public

export const getallCategory = async (req, res)=>{
    try {

        const Categories = await categoryModel.find();
        res.json({
            status : "success",
            message : "Category Fetched successfully",
            Categories
        })
        
    } catch (e) {
        res.status(404).send({error:e?.message});
    }

}

// description : get single Category
// @routes     : Get /api/v1/getsinglecategory
// @access     : public 

export const getSingleCataegory = async (req, res)=>{

    try {
        const getsingledata = await categoryModel.findById(req.params.id);
        res.json({
            status : "success",
            message : "Single data fatched Successfully",
            getsingledata
         })
    } catch (e) {
            res.status(404).send({error:e?.message})
    }
}

//description  : categoryUpdate
//@routes      : put /api/v1/updateCategory
// @access     : private/ Admin
export const updateCategory = asyncHandler(async(req , res )=>{

    const {Name} = req.body;

    const updateData = await categoryModel.findByIdAndUpdate(req.params.id,{Name},{new:true});

    res.json({
        status: "success",
        message : "category Updated successFully",
        updateData
    })
});

   // description : delete Category
   //@routes      : delete /api/v1cCategoryDelete
   // @ access    : private/ Admin


export const deleteCategory  = asyncHandler(async(req, res)=>{
     try {
      
        const deleteData = await categoryModel.findByIdAndDelete(req.params.id);        
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