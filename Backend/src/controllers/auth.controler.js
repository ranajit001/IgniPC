import { UserModel } from "../models/user.model.js";
import jwt from 'jsonwebtoken';
import argon2 from 'argon2';
import {config} from 'dotenv'
config();


const generateToekn =(user)=>{
    const payload = {id:user._id,email:user.email,role:user.role}
        const accessToken = jwt.sign(payload,process.env.jwt_secret);
        return accessToken
}


export const register = async(req,res)=>{
    try {
        const{name,email,password,role} = req.body;
        if(!name.trim()|| !email.trim()|| !password )
                    return res.status(400).json({message:'Please provede all credentials...'});

        const existeduser = await UserModel.findOne({email});
        if(existeduser){
            return res.status(409).json({message:'user already exists'});
        }
        const hash =await argon2.hash(password);
        await UserModel.create({name,email,password:hash,role});
        res.status(201).json({message:'created'})
    } catch (error) {
        console.log('error from regiser user',error.message);
        res.status(500).json({message:'server error'});
    }
};


export const login = async(req,res)=>{
    try {
        const{email,password}= req.body;
        if(!email.trim() || !password)
                    return res.staus(400).json({message:'provide all details'})
        const user = await UserModel.findOne({email}).lean();
        if(!user)
            return res.status(404).json({message:'User not found'});
        const verify = await argon2.verify(user.password,password);
        if(!verify)
            return res.status(400).json({message:'invaslid password...'});
        delete user.password
        res.status(200).json({
            user,
            accessToken:generateToekn(user)
        })
    } catch (error) {
        console.log(error.message,'from login controller');
        res.status(500).json({message:error.message})
    }
}