import { Router } from "express";
export const ProductRouter = Router();

import { getProduct,createProduct,updateProduct,deleteprodsuct } from "../controllers/product.controller.js";
import { rolebsed } from "../middlewares/auth.middlewares.js";
import { upload } from "../middlewares/multer.js";




ProductRouter
.post('/create',rolebsed(['admin']),upload.array('images',5),createProduct)
.get('/',getProduct)
.patch('/update/:id',rolebsed(['admin']),updateProduct)
.delete('/delete/:id',rolebsed(['admin']),deleteprodsuct)
.get('/:id',getProduct)