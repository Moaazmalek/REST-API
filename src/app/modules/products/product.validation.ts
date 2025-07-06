import {z} from 'zod'

export const VariantsValidationSchema=z.object({
    type:z.string(),
    value:z.string()
})
export const InventoryValidationSchema=z.object({
    quantity:z.number(),
    inStock:z.boolean()
})

 const ProductValidationSchema=z.object({
    name:z.string({
        required_error:"Name is required",
        invalid_type_error:"Name must be a string"
    }),
    description:z.string(),
    price:z.number().positive(),
    category:z.string(),
    tags:z.array(z.string()),
    variants:z.array(VariantsValidationSchema),
    inventory:InventoryValidationSchema
}) 

export default ProductValidationSchema

