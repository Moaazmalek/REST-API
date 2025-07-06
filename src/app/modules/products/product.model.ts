import {Schema,model} from 'mongoose'
import { boolean } from 'zod'
import { TInventory, TProduct, TVariants } from './product.interface'
const VariantSchema=new Schema<TVariants>({
    type:String,
    value:String
},{_id:false})
const InventorySchema=new Schema<TInventory>({
    quantity:Number,
    inStock:Boolean
},{_id:false})

const ProductSchema=new Schema<TProduct>({
    name:{
        type:String,
        required:true,
    },
    description: String,
    price: Number,
    category: String,
    tags:[String],
    variants:[VariantSchema],
    inventory:InventorySchema

})


const Product=model("Product",ProductSchema)
export default Product
