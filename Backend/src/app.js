import e from "express";
import { userRouter } from "./routes/user.route.js";
import { ProductRouter } from "./routes/product.router.js";
import { OrderRouter } from "./routes/order.router.js";
import { connsctDb } from "./configs/db.js";

import cors from 'cors';

const app = e();
app.use(e.json());
app.use(cors());



app.use('/user',userRouter)
app.use('/product',ProductRouter)
app.use('/order',OrderRouter)


app.listen(3000,async()=>{
    await connsctDb();
})