import {config} from 'dotenv'
import mongoose from 'mongoose';

config();

export const connsctDb = async()=>{
    try {
        await mongoose.connect(`mongodb+srv://ranajit:pass123@unit4.21hbz.mongodb.net/ignipc?retryWrites=true&w=majority&appName=unit4`);
        console.log('db connected');
        
    } catch (error) {
       console.log(error.message);
    }
}