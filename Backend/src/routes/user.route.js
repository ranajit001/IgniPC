import {Router} from 'express';
export const userRouter = Router();


import { register,login } from '../controllers/auth.controler.js';

userRouter.post('/register',register)
.post('/login',login)
