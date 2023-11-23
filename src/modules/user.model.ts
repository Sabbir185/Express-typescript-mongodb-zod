import { Schema, model } from 'mongoose';
import { TUser, TUserAddress } from './user/user.interface';


const userAddressSchema = new Schema<TUserAddress>({
    street: {
        type: String,
        required: [true, "Street is required"],
        maxlength: [100, "Street cannot be more than 100 characters"]
    },
    city: {
        type: String,
        required: [true, "City is required"],
    },
    country: {
        type: String,
        required: [true, "Country is required"],
    },
})

const userSchema = new Schema<TUser>({
    userId: {
        type: Number,
        required: [true, "UserID field is required"],
        unique: true
    },
    username: {
        type: String,
        required: [true, "UserID field is required"],
        unique: true,
        trim: true,
    },
    password: String,
    fullName: {
        firstName: {
            type: String,
            trim: true,
            required: [true, "FirstName is required"],
            maxlength: [30, "FirstName cannot be more than 30 characters"]
        },
        lastName: {
            type: String,
            trim: true,
            required: [true, "LastName is required"],
            maxlength: [30, "LastName cannot be more than 30 characters"]
        },
    },
    age: Number,
    email: {
        type: String,
        trim: true,
        lowercase: true,
        required: [true, "Email field is required"]
    },
    isActive: {
        type: Boolean,
        default: true
    },
    hobbies: [String],
    address: userAddressSchema,
    orders: [
        {
            productName: String,
            price: Number,
            quantity: Number
        }
    ]

}, {timestamps: true});


export const User = model<TUser>("User", userSchema)