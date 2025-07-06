import {Router} from 'express'
import { createProduct, deleteProduct, getAllProducts, getSingleProduct,updateProduct } from './product.controller';
import { verifyToken } from '../../middleware/authMiddleware';
import { isAdmin } from '../../middleware/adminMiddleware';

const router=Router()

router.get("/",verifyToken,getAllProducts) 
router.post("/",verifyToken,isAdmin,createProduct) 
router.get("/:productId",verifyToken,getSingleProduct)
router.put("/:productId",verifyToken,isAdmin,updateProduct)
router.delete("/:productId",verifyToken,isAdmin,deleteProduct)

export const ProductRouts=router;