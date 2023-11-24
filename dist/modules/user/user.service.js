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
exports.UserServices = void 0;
const user_model_1 = require("../user.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("../../config"));
const createUserIntoDB = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const newUser = new user_model_1.User(Object.assign({}, user));
    yield newUser.save();
    return newUser.toObject();
});
const updateUserIntoDB = (userId, userData) => __awaiter(void 0, void 0, void 0, function* () {
    // if user send password, then password will be updated
    const hashPassword = (userData === null || userData === void 0 ? void 0 : userData.password) && (yield bcrypt_1.default.hash(userData.password, Number(config_1.default.bcrypt_salt_rounds)));
    const updatedUser = yield user_model_1.User.findOneAndUpdate({ userId }, {
        $set: Object.assign(Object.assign({}, userData), { password: hashPassword })
    }, { new: true }).select({ password: 0, _id: 0, __v: 0, orders: 0 });
    return updatedUser;
});
const getAllUserFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_model_1.User.find({}).select({ username: 1, fullName: 1, age: 1, email: 1, address: 1, _id: 0 });
    return users;
});
const getSingleUserFromDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield user_model_1.User.isUserExists(userId);
});
const checkUserExistsOrNotFromDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield user_model_1.User.isUserExists(userId);
});
const deleteUserFromDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.deleteOne({ userId });
    return result;
});
//From Here product order part start
const addProductInOrderIntoDB = (userId, product) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.updateOne({ userId }, { $push: { orders: product } });
    return result;
});
const getAllOrdersForSpecificUserFromDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.aggregate([
        {
            $match: { userId },
        },
        {
            $project: {
                orders: 1,
                _id: 0,
            }
        }
    ]);
    return result[0];
});
const totalPriceForSpecificUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const result = yield user_model_1.User.aggregate([
        {
            $match: { userId },
        },
        { $unwind: { path: '$orders', preserveNullAndEmptyArrays: true } },
        {
            $group: {
                _id: "$_id",
                totalPrice: { $sum: { $multiply: ["$orders.price", "$orders.quantity"] } },
            }
        },
        {
            $project: {
                totalPrice: { $ifNull: ["$totalPrice", 0] },
                _id: 0,
            }
        }
    ]);
    return {
        totalPrice: (result === null || result === void 0 ? void 0 : result.length) > 0 ? (_a = result[0]) === null || _a === void 0 ? void 0 : _a.totalPrice : 0
    };
});
exports.UserServices = {
    createUserIntoDB,
    getAllUserFromDB,
    getSingleUserFromDB,
    deleteUserFromDB,
    updateUserIntoDB,
    checkUserExistsOrNotFromDB,
    addProductInOrderIntoDB,
    getAllOrdersForSpecificUserFromDB,
    totalPriceForSpecificUser
};
