import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    title:{type:String,requierd:true},
    createdBy:{type:mongoose.Types.ObjectId,ref:'User',requierd:true},
    description:{type:String,requierd:true},
    price:{type:Number,requierd:true},
   images: [{ type: String, required: true }],
    stock:{type:Number,requierd:true},
});

export const ProductModel = mongoose.model('Product',productSchema);