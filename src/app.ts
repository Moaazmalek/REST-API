import express from 'express'
import cors from 'cors'
import config from './app/config'
import { ProductRouts } from './app/modules/products/product.routes'
import { OrderRoutes } from './app/modules/orders/order.routes'
import { UserRoutes } from './app/modules/users/user.routes'
const app=express()
//parser option;
app.use(express.json())
app.use(cors())

app.use('/api/products',ProductRouts)
app.use('/api/orders',OrderRoutes)
app.use("/api/users",UserRoutes)

app.get("/",(req,res,next) => {
res.send("Ecommerce Inventory Server is running...!")
})



export default app;