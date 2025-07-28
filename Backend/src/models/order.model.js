import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
        userId:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},
       orders:[{
                productId:{type:mongoose.Schema.Types.ObjectId,ref:'Product',required:true},
                quantity:{type:Number,required:true},
                totalPrice:{type:Number,required:true},
                status: { type: String, enum: ['pending','confirmed','paid','picked','shipped','delivered'], default: 'pending' },
                paymentCollected: { type: Boolean, default: false },
                orderDate:{type:Date,default:new Date},
            }],
    location:{type:String,required:true},
    // confirmedBy:{type:mongoose.Schema.Types.ObjectId,ref:'Product'},
},{timestamps:true})

export const OrderModel = mongoose.model('Order',OrderSchema);