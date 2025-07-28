import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {type:String,required:true},
    email:{type:String,required:true,unique:true},
    password: {type:String,required:true},
    role: {type:String,required:true,enum:['admin','customer'],default:'customer'},
});

export const UserModel = mongoose.model('User',UserSchema);