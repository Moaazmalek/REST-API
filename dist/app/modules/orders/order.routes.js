"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderRoutes = void 0;
const express_1 = require("express");
const order_controller_1 = require("./order.controller");
const router = (0, express_1.Router)();
// router.get("/",getAllOrders) 
router.post("/", order_controller_1.createOrder);
router.get("/", order_controller_1.handleGetAllOrders);
// router.get("/:productId",getSingleProduct)
// router.put("/:productId",updateProduct)
// router.delete("/:productId",deleteProduct)
exports.OrderRoutes = router;
