import { z } from 'zod';

const fullNameValidationSchema = z.object({
    firstName: z
        .string()
        .min(1, { message: 'First Name is required' })
        .max(30)
        .refine((value) => /^[A-Z]/.test(value), {
            message: 'First Name must start with a capital letter',
        }),
    lastName: z
        .string()
        .min(1, { message: 'Last Name is required' })
        .max(30)
        .refine((value) => /^[A-Z]/.test(value), {
            message: 'First Name must start with a capital letter',
        }),
});

const ordersValidationSchema = z.array(
    z.object({
        productName: z.string(),
        price: z.number(),
        quantity: z.number(),
    }),
);

export const userValidationSchema = z.object({
    userId: z.number().min(1, { message: 'UserID field is required' }),
    username: z.string().min(1, { message: 'UserName field is required' }),
    password: z
        .string()
        .min(6, { message: 'Minimum 6 characters password is required' }),
    fullName: fullNameValidationSchema,
    age: z.number(),
    email: z.string().email(),
    isActive: z.boolean(),
    hobbies: z.array(z.string()),
    address: z.object({
        street: z
            .string()
            .max(100, { message: 'Street cannot be more than 100 characters' }),
        city: z.string().min(1),
        country: z.string().min(1),
    }),
    orders: ordersValidationSchema.optional(),
});
