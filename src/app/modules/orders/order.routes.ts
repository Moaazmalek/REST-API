import {Router} from 'express'
import { createOrder, handleGetAllOrders } from './order.controller';



const router=Router()
// router.get("/",getAllOrders) 
router.post("/",createOrder) 
router.get("/",handleGetAllOrders)
// router.get("/:productId",getSingleProduct)
// router.put("/:productId",updateProduct)
// router.delete("/:productId",deleteProduct)

export const OrderRoutes=router;