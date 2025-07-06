import { Request, Response } from "express";
import ProductValidationSchema from "./product.validation";
import { ProductServices } from "./product.services";

export const createProduct = async (req: Request, res: Response) => {
  try {
    const zodParser = ProductValidationSchema.parse(req.body);
    const result = await ProductServices.createAProductIntoDB(zodParser);
    res.status(201).json({
      success: true,
      message: "Product created Successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Something went wrong",
      error: error,
    });
  }
};
export const getAllProducts = async (req: Request, res: Response) => {
  //    const result=await ProductServices.getProductsFromDB()
  const { searchTerm } = req.query;
  const result = await ProductServices.getProductsFromDB(searchTerm as string);
  res.status(200).json({
    success: true,
    message: "Products fetched successfully",
    data: result,
  });
};

export const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await ProductServices.getSignleProductFromDB(productId);
    res.status(200).json({
      success: true,
      message: "Product fetched Successfully",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || "Something went wrong",
      error: err,
    });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const data = req.body;
    const result = await ProductServices.updateProductIntoDB(productId, data);
    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || "Something went wrong",
      error: err,
    });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const {productId}=req.params
    const result=await ProductServices.deleteFromDB(productId)
     res.status(200).json({
      success: true,
      message: "Product deleted successfully",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || "Something went wrong",
      error: err,
    });
  }
};
