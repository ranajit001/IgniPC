import {config} from 'dotenv'
import mongoose from 'mongoose';

config();

export const connsctDb = async()=>{
    try {
        await mongoose.connect(`mongodb://127.0.0.1:27017/ecom`);
    } catch (error) {
       console.log(error.message);
    }
}