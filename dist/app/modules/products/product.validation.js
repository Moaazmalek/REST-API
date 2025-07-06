"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InventoryValidationSchema = exports.VariantsValidationSchema = void 0;
const zod_1 = require("zod");
exports.VariantsValidationSchema = zod_1.z.object({
    type: zod_1.z.string(),
    value: zod_1.z.string()
});
exports.InventoryValidationSchema = zod_1.z.object({
    quantity: zod_1.z.number(),
    inStock: zod_1.z.boolean()
});
const ProductValidationSchema = zod_1.z.object({
    name: zod_1.z.string({
        required_error: "Name is required",
        invalid_type_error: "Name must be a string"
    }),
    description: zod_1.z.string(),
    price: zod_1.z.number().positive(),
    category: zod_1.z.string(),
    tags: zod_1.z.array(zod_1.z.string()),
    variants: zod_1.z.array(exports.VariantsValidationSchema),
    inventory: exports.InventoryValidationSchema
});
exports.default = ProductValidationSchema;
