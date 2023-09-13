import brandModel from "../model/Brand.js";
import categoryModel from "../model/Category.js";
import productModel from "../model/Product.js";
import asyncHandler from "express-async-handler";
import Datauri from "datauri";




//description : Create Product
//@Routes     : Post /api/product
//Access      : Private/Admin

export const createProduct = asyncHandler(async (req, res) => {
//console.log(req.files);
//  const dUri = new Datauri();

// let files = dUri.format(path.extname(req.files?.originalname).toString(),req.files?.buffer);
// console.log(files);

//const convertImg= req.files.map((file)=>file.buffer);
//console.log(convertImg);
   const {
    Name,
    Description, 
    Brand,
    Category,
    Sizes,
    Colors,
    User,
    Images,
    Price,
    totalQty,
  } = req.body;

  //find the category
  const categoryFound = await categoryModel.findOne({
    Name: Category?.toLowerCase(),
  });
  if (!categoryFound) {
    throw new Error(
      "Category Not Found, please create Category First or check category Name "
    );
  }

  //find Brand
  const brandFound = await brandModel.findOne({ Name: Brand?.toLowerCase() });
  if (!brandFound) {
    throw new Error(
      "Brand Not Found, please create Category First or check Brand Name"
    );
  }

  const productExists = await productModel.findOne({ Name });
  if (productExists) {
    throw new Error("Product Already Exists");
  } else {
    //Create The Products

    let Image = req?.files?.map((item) => {
      return item.filename;
    });

    const products = await productModel.create({
      Name,
      Description,
      Brand,
      Category,
      Sizes,
      Colors,
      User: req.userAuthId,
      Images:Image,
      Price,
      totalQty,
    });

    //push the product id into the Category
    categoryFound.Products.push(products._id);
    //resave
    await categoryFound.save();

    //push the product id into the Brand
    brandFound.Products.push(products._id);
    // ReSave
    await brandFound.save();

    //send res by message
    res.status(201).json({
      status: "success",
      message: "Product Created Successfully",
      products,
    });
  }
});

export const getProducts = asyncHandler(async (req, res) => {
  //console.log(req.query)

  //find all data In Product Model
  let productQuery = productModel.find();

  // search Product by name
  if (req.query.name) {
    productQuery = productQuery.find({
      Name: { $regex: req.query.name, $options: "i" },
    });
  }

  //filter by brand
  if (req.query.brand) {
    productQuery = productQuery.find({
      Brand: { $regex: req.query.brand, $options: "i" },
    });
  }

  // filter by category
  if (req.query.category) {
    productQuery = productQuery.find({
      Category: { $regex: req.query.category, $options: "i" },
    });
  }

  // find by color
  if (req.query.color) {
    productQuery = productQuery.find({
      Colors: { $regex: req.query.color, $options: "i" },
    });
  }

  // find by Size
  if (req.query.size) {
    productQuery = productQuery.find({
      Sizes: { $regex: req.query.size, $options: "i" },
    });
  }

  // Filter By Price Range

  if (req.query.price) {
    const priceRange = req.query.price.split("-");
    //gte : gratter than or equel to
    //lte : less than or equal to
    productQuery = productQuery.find({
      Price: { $gte: priceRange[0], $lte: priceRange[1] },
    });
  }

  //pagination
  //page
  const page = parseInt(req.query.page) ? parseInt(req.query.page) : 1;
  // 1 page pai records limit
  const limit = parseInt(req.query.limit) ? parseInt(req.query.limit) : 10;
  //startIndex
  const startIndex = (page - 1) * limit;
  //endIndex
  const endIndex = page * limit;
  //total
  const total = await productModel.countDocuments();

  productQuery = productQuery.skip(startIndex).limit(limit);

  //pagination result
  const pagination = {};
  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit,
    };
  }
  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit,
    };
  }

  //await the Query get All Products
  const products = await productQuery.populate("Reviews");

  res.status(200).json({
    status: "success",
    total,
    results: products.length,
    pagination,
    message: "Products fached successfully",
    products,
  });
});

// Description  : Get Single Product
// @route       : Get /api/product/:id
// @access      : Public

export const getSingleProduct = asyncHandler(async (req, res) => {
  // console.log(req.params)

  const productId = await productModel
    .findById(req.params.id)
    .populate("Reviews");
  if (!productId) {
    throw Error("Product Not Found");
  }
  res.json({
    status: "Success",
    message: "Product Fetched",
    productId,
  });
});

// @DESCRIPTION  : Update Product
// @Routes       : Put /api/v1/productUpdate/:id
// @access      : Private/Admin

export const updateProduct = asyncHandler(async (req, res) => {
  //console.log(req)
  const {
    Name,
    Description,
    Brand,
    Category,
    Sizes,
    Colors,
    User,
    Price,
    totalQty,
  } = req.body;

  const productsUpdate = await productModel.findByIdAndUpdate(
    req.params.id,
    {
      Name,
      Description,
      Brand,
      Category,
      Sizes,
      Colors,
      User,
      Price,
      totalQty,
    },

    { new: true }
  );
  res.json({
    status: "success",
    message: "Product Updated Successfully",
    productsUpdate,
  });
});

export const DeleteProduct = asyncHandler(async (req, res) => {
  const DeleteProduct = await productModel.findByIdAndDelete(req.params.id);
  if (DeleteProduct) {
    res.json({
      status: "success",
      message: "Data Deleted Succcesfully",
    });
  } else {
    res.status(404).send("Error For Delete Data !!!");
  }
});
