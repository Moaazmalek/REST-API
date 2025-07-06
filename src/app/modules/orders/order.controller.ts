import { Request, RequestHandler, Response } from "express";
import orderValidationSchema from "./order.validation";
import { OrderServices } from "./order.services";
import Product from "../products/product.model";

export const createOrder = async (req: Request, res: Response) => {
  try {
    //zod validation
    const zodValidation = orderValidationSchema.safeParse(req.body);
    if (
      typeof zodValidation.error !== "undefined" &&
      zodValidation.error.name === "ZodError"
    ) {
      const errorLists = zodValidation.error.issues.map((err) => err.message);
       res.status(500).json({
        success: false,
        message: "Validation error",
        errors: errorLists,
      });
      return 
       
    }
    if (zodValidation.success) {
      const product = await Product.findById(zodValidation.data.productId);
      if (product && product.inventory.quantity < zodValidation.data.quantity) {
         res.status(400).json({
          success: false,
          message: "Insufficient quantity available in this inventory",
        });
        return
      }

      if (product) {
        // we have total 70 products
        //product.inventory.quantity = 60
        product.inventory.quantity =
          product.inventory.quantity - zodValidation.data.quantity;
        product.inventory.inStock =
          product.inventory.quantity === 0 ? false : true;
        const newOrder = await OrderServices.createANewOrder(
          zodValidation.data
        );

        await product.save();
         res.status(200).json({
          success: true,
          message: "Order placed successfully",
          data: newOrder,
        });
      }
    }
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || "Something went wrong",
      error: err,
    });
  }
};

export const handleGetAllOrders = async (req: Request, res: Response) => {
  const email = req.query.email;
  try {
    const orders = await OrderServices.getAllOrdersFromDB(
      email as string | undefined
    );
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
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || "Something went wrong",
      error: err,
    });
  }
};
