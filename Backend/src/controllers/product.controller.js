import { ProductModel } from "../models/product.model.js";
import cloudinary from "../configs/cloudinary.js";

import fs from 'fs';


export const getProduct = async (req, res) => {
  console.log('coming');

  const id = req.params.id;

  try {

    if (id) {
      const product = await ProductModel.findById(id);
      return res.status(200).json(product);
    }


    let {
      search,
      minPrice,
      maxPrice,
      page = 1,
      sort = 'title',
      order = 'asc',
      limit = 20,
    } = req.query;

    page = Number(page);
    limit = Number(limit);

    if (search) search = search.trim();

    
    const searchObj = {};

    if (search) {
      searchObj.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

   
    if (minPrice || maxPrice) {
      searchObj.price = {};
      if (minPrice) searchObj.price.$gte = Number(minPrice);
      if (maxPrice) searchObj.price.$lte = Number(maxPrice);
    }


    const sortOrder = order === 'asc' ? 1 : -1;

    const products = await ProductModel.aggregate([
      { $match: searchObj },
      { $sort: { [sort]: sortOrder } },
      { $skip: (Math.abs(page) - 1) * limit },
      { $limit: limit },
    ]);

    console.log(products, 'products');
    res.status(200).json(products);
  } catch (error) {
    console.log('error from get products', error);
    res.status(500).json({ message: error.message });
  }
};








export const createProduct = async (req,res) => { 

    try {
const { title, price,  description,stock } = req.body;


       if(!title.trim() || price<0 || !description.trim()|| stock<0)
                    return res.status(400).json({message:'please provide all details...'})


        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ message: 'atlest 1 image must be uploaded...' });
          }

    const imageUpload = req.files.map(async(file) =>await cloudinary.uploader.upload(file.path));
    const uploadPromis = await Promise.all(imageUpload);

    const imageUrls = uploadPromis.map((result) => result.secure_url);
      req.files.forEach((file) => fs.unlinkSync(file.path));

     const productData = {
        title,
        price,
        description,
        createdBy:req.user.id,
        images: imageUrls,  
        stock
      };
      const product = await ProductModel.create(productData); 
      res.status(201).json(product);
    } catch (error) { console.log(error);
        res.status(500).json({message:error.message})
    }
};




export const updateProduct = async (req, res) => {
         const id = req.params.id;
    try {
            if(id){
                const prod = await ProductModel.findByIdAndUpdate(id,req.body,{runValidators:true,new:true})
                return res.status(200).json(prod)
            }
        const filter = {}; 
        for (let key in req.query) {
            if (req.query[key].trim()) { 
                filter[key] = { $regex: req.query[key], $options: 'i' }; 
            }
        }
        if (!Object.keys(filter).length && !Object.keys(req.body).length) {
            return res.status(400).json({ message: "No fields to update" });
        }
        const result = await ProductModel.updateMany(filter,req.body,{ runValidators: true });
        res.status(200).json({
            modifiedCount: result.modifiedCount
        });
    } catch (error) {
        console.log(error.message,'error from update product');
        res.status(500).json({ message: "Server error" });
    }
};


export const deleteprodsuct = async (req,res) => {
            const id = req.params.id;
    try {
        if(id){
            const result = await ProductModel.findByIdAndDelete(id);
            if(result.deletedCount== 1)
                    return res.status(200).json({message:'deleted...'})
            res.status(404).json({message:'no product found to delete...'})
        }
    } catch (error) {
               console.log(error.message,'error from delete product');
        res.status(500).json({ message: "Server error" }); 
    }
}