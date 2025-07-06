import { TProduct } from "./product.interface";
import Product from "./product.model";

const createAProductIntoDB=async(productData:TProduct) => {
    const result=await Product.insertOne(productData)
    return result;

}
const getProductsFromDB=async(searchTerm="") => {
    const query=searchTerm ? {name:{$regex:searchTerm,$options:"i"}}:{}
    const result=await Product.find(query)
    return result;

}

const getSignleProductFromDB=async(id:string) => {
    const result=await Product.findById(id)
    return result
}
const updateProductIntoDB=async(id:string,data:Partial<TProduct>) => {
const result=await Product.findByIdAndUpdate({_id:id},data,{new:true})
return result;
}
const deleteFromDB=async(id:string) => {
    const result=await Product.findByIdAndDelete(id)
    return result
}
export const ProductServices= {
    createAProductIntoDB,
    getProductsFromDB,
    getSignleProductFromDB,
    updateProductIntoDB,
    deleteFromDB
}