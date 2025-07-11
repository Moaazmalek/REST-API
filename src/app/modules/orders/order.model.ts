import { Schema ,model} from "mongoose";
import { TOrder } from "./order.interface";

const OrderSchema=new Schema<TOrder>({
    email:{
        type:String,
        required:true
    },
    productId:{
        type:String,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },
    price:{
        type:Number,
        required:true
    }

})

const Order=model("Order",OrderSchema)
export default Order;