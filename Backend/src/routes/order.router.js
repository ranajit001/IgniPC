import { Router } from "express";
export const OrderRouter = Router();
import { newOrder,updateOrderById,getOrderDetails } from "../controllers/order.controller.js";

import { rolebsed } from "../middlewares/auth.middlewares.js";

OrderRouter.
post('/create',rolebsed(['customer']),newOrder)
.patch('/update/:id',rolebsed(['admin']),updateOrderById)
.get('/:id',rolebsed(['customer','admin']),getOrderDetails)