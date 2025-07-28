import { OrderModel } from "../models/order.model.js";
import { ProductModel } from "../models/product.model.js";

export const newOrder = async (req,res) => {
        
    try {
        const {productdArr,location }= req.body.productIds; //{{id:,quantity},{location:}}
        if(!Array.isArray(productdArr)|| productdArr.length<=0)
                        return res.status(400).json({mesage:'invalid product array'});

            const orderObj={orders:[],userId:req.user.id};
        
            for(let el of productdArr){
                const prod = await ProductModel.findById(el.id);
                if(prod.stock>=el.quantity ){
                    prod.stock-= el.quantity;
                    await prod.save();
                    orderObj.orders.push({
                        productId:el.id,
                        quantity:el.quantity,
                        totalPrice:el.quantity*prod.price,
                    });
                    orderObj.location= location;
                }else{
                    return res.status().json({message:`${prod.title} is out of stock`})
                }
            }
            await OrderModel.create(orderObj)
            return res.status(201).json({message:'created'})
    } catch (error) {
        console.log(error.message,'error from cerate order');
        res.status(500).json({message:`server error`})
    }
};


export const updateOrderById = async (req,res) => { //accesable only by admin
    try {
        const{id}= req.params;
        const updated = await OrderModel.findByIdAndUpdate(id,req.body,{runValidators:true,new:true});
        if(!updated)
                return res.status(404).json({message:'product not found'});
        res.status.json(updated);
        
    } catch (error) {
        console.log('error from updated product',error.message);
        res.status(500).json({message:error.message})        
    }
}


export const getOrderDetails = async (req,res) => {
    const{id} = req.params.id;
    try {
        let order;
        if(id){
            if(req.user.role == 'customer')
                 order = await OrderModel.findOne({_id:id,userId:req.user.id});
            if(req.user.role=='admin')
                order = await OrderModel.findById(id)
            if(!order) return res.status(404).json({message:'Orer not found...'})
                return res.status(200).json(order)
        }
        let allOrders;
            if(req.user.role == 'customer')
                 allOrders = await OrderModel.find({userId:req.user.id}).sort({createdAt:-1});
            if(req.user.role=='admin')
                 allOrders = await OrderModel.find().sort({createdAt:-1});
            if(!allOrders) return res.status(404).json({message:'Orer not found...'})
               
            res.status(200).json(allOrders);
        
    } catch (error) {
        console.log('error from  get orders',error.message);
                res.status(500).json({message:error.message})        
    }
}