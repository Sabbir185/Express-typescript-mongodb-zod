"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("../config"));
const userAddressSchema = new mongoose_1.Schema({
    street: {
        type: String,
        required: [true, 'Street is required'],
        maxlength: [100, 'Street cannot be more than 100 characters'],
    },
    city: {
        type: String,
        required: [true, 'City is required'],
    },
    country: {
        type: String,
        required: [true, 'Country is required'],
    },
});
const userSchema = new mongoose_1.Schema({
    userId: {
        type: Number,
        required: [true, 'UserID field is required'],
        unique: true,
    },
    username: {
        type: String,
        required: [true, 'UserID field is required'],
        unique: true,
        trim: true,
    },
    password: String,
    fullName: {
        firstName: {
            type: String,
            trim: true,
            required: [true, 'FirstName is required'],
            maxlength: [30, 'FirstName cannot be more than 30 characters'],
        },
        lastName: {
            type: String,
            trim: true,
            required: [true, 'LastName is required'],
            maxlength: [30, 'LastName cannot be more than 30 characters'],
        },
    },
    age: Number,
    email: {
        type: String,
        trim: true,
        lowercase: true,
        required: [true, 'Email field is required'],
        unique: true
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    hobbies: [String],
    address: userAddressSchema,
    orders: [
        {
            productName: String,
            price: Number,
            quantity: Number,
        },
    ],
});
userSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        this.password = yield bcrypt_1.default.hash(this.password, Number(config_1.default.bcrypt_salt_rounds));
        next();
    });
});
userSchema.post("save", function (doc, next) {
    doc.password = '';
    next();
});
userSchema.statics.isUserExists = function (userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const isUser = yield exports.User.findOne({ userId }).select({ password: 0, _id: 0, __v: 0, orders: 0 });
        return isUser;
    });
};
exports.User = (0, mongoose_1.model)('User', userSchema);
