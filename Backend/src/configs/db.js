import {config} from 'dotenv'
import mongoose from 'mongoose';

config();

export const connsctDb = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log('db connected');
        
    } catch (error) {
       console.log(error.message);
    }
}