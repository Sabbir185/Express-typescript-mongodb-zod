"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidationSchema = exports.ordersValidationSchema = void 0;
const zod_1 = require("zod");
const fullNameValidationSchema = zod_1.z.object({
    firstName: zod_1.z
        .string()
        .min(1, { message: 'First Name is required' })
        .max(30)
        .refine((value) => /^[A-Z]/.test(value), {
        message: 'First Name must start with a capital letter',
    }),
    lastName: zod_1.z
        .string()
        .min(1, { message: 'Last Name is required' })
        .max(30)
        .refine((value) => /^[A-Z]/.test(value), {
        message: 'First Name must start with a capital letter',
    }),
});
exports.ordersValidationSchema = zod_1.z.object({
    productName: zod_1.z.string(),
    price: zod_1.z.number(),
    quantity: zod_1.z.number(),
});
exports.userValidationSchema = zod_1.z.object({
    userId: zod_1.z.number().min(1, { message: 'UserID field is required' }),
    username: zod_1.z.string().min(1, { message: 'UserName field is required' }),
    password: zod_1.z
        .string()
        .min(6, { message: 'Minimum 6 characters password is required' }),
    fullName: fullNameValidationSchema,
    age: zod_1.z.number(),
    email: zod_1.z.string().email(),
    isActive: zod_1.z.boolean(),
    hobbies: zod_1.z.array(zod_1.z.string()),
    address: zod_1.z.object({
        street: zod_1.z
            .string()
            .max(100, { message: 'Street cannot be more than 100 characters' }),
        city: zod_1.z.string().min(1),
        country: zod_1.z.string().min(1),
    }),
    orders: zod_1.z.array(exports.ordersValidationSchema).optional(),
});
