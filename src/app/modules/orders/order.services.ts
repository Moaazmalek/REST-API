import { TOrder } from "./order.interface";
import Order from "./order.model";

const createANewOrder=async(data:TOrder) => {
   return await Order.create(data)
}
const getAllOrdersFromDB=async(query:string | undefined) => {
    const filter = query? {email:query}:{}
    return await Order.find(filter)

}
export const OrderServices={
    createANewOrder,
    getAllOrdersFromDB
}
