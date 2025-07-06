"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleGetAllOrders = exports.createOrder = void 0;
const order_validation_1 = __importDefault(require("./order.validation"));
const order_services_1 = require("./order.services");
const product_model_1 = __importDefault(require("../products/product.model"));
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //zod validation
        const zodValidation = order_validation_1.default.safeParse(req.body);
        if (typeof zodValidation.error !== "undefined" &&
            zodValidation.error.name === "ZodError") {
            const errorLists = zodValidation.error.issues.map((err) => err.message);
            res.status(500).json({
                success: false,
                message: "Validation error",
                errors: errorLists,
            });
            return;
        }
        if (zodValidation.success) {
            const product = yield product_model_1.default.findById(zodValidation.data.productId);
            if (product && product.inventory.quantity < zodValidation.data.quantity) {
                res.status(400).json({
                    success: false,
                    message: "Insufficient quantity available in this inventory",
                });
                return;
            }
            if (product) {
                // we have total 70 products
                //product.inventory.quantity = 60
                product.inventory.quantity =
                    product.inventory.quantity - zodValidation.data.quantity;
                product.inventory.inStock =
                    product.inventory.quantity === 0 ? false : true;
                const newOrder = yield order_services_1.OrderServices.createANewOrder(zodValidation.data);
                yield product.save();
                res.status(200).json({
                    success: true,
                    message: "Order placed successfully",
                    data: newOrder,
                });
            }
        }
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || "Something went wrong",
            error: err,
        });
    }
});
exports.createOrder = createOrder;
const handleGetAllOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.query.email;
    try {
        const orders = yield order_services_1.OrderServices.getAllOrdersFromDB(email);
        if (orders.length == 0) {
            res.status(200).json({
                success: true,
                message: "No orders found for this email",
                data: [],
            });
            return;
        }
        res.status(200).json({
            success: true,
            message: "Orders fetched successfully",
            data: orders,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || "Something went wrong",
            error: err,
        });
    }
});
exports.handleGetAllOrders = handleGetAllOrders;
