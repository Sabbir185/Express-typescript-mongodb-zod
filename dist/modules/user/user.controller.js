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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_service_1 = require("./user.service");
const user_validation_1 = require("./user.validation");
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { body } = req;
        const zodParsedData = user_validation_1.userValidationSchema.parse(body);
        const result = yield user_service_1.UserServices.createUserIntoDB(zodParsedData);
        return res.status(200).json({
            success: true,
            message: 'User created successfully!',
            data: Object.assign(Object.assign({}, result), { _id: undefined, __v: undefined, password: undefined, orders: undefined }),
        });
    }
    catch (error) {
        if ((error === null || error === void 0 ? void 0 : error.name) === 'ZodError') {
            return res.status(400).json({
                success: false,
                message: 'Server side error',
                error: {
                    code: 400,
                    description: JSON.stringify(error === null || error === void 0 ? void 0 : error.issues[0])
                },
            });
        }
        else if ((error === null || error === void 0 ? void 0 : error.code) === 11000) {
            return res.status(400).json({
                success: false,
                message: 'Bad request, user already exists!',
                error: {
                    code: 11000,
                    description: `Duplicate field found, ${Object.keys(error === null || error === void 0 ? void 0 : error.keyValue)[0]} - ${error === null || error === void 0 ? void 0 : error.keyValue[Object.keys(error === null || error === void 0 ? void 0 : error.keyValue)[0]]}`
                },
            });
        }
        else {
            return res.status(500).json({
                success: false,
                message: 'Server side error',
                error: {
                    code: 500,
                    description: 'Server side error',
                },
            });
        }
    }
});
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { body } = req;
        const { userId } = req.params;
        // user checking from database by using static method
        const isUserExists = yield user_service_1.UserServices.checkUserExistsOrNotFromDB(Number(userId));
        if (!isUserExists) {
            return res.status(404).json({
                success: false,
                message: "User not found",
                error: {
                    code: 404,
                    description: "User not found!"
                }
            });
        }
        // data validation and updating the user information
        const zodParsedData = user_validation_1.userValidationSchema.parse(body);
        const result = yield user_service_1.UserServices.updateUserIntoDB(Number(userId), zodParsedData);
        return res.status(200).json({
            success: true,
            message: "User updated successfully!",
            data: result,
        });
    }
    catch (error) {
        if ((error === null || error === void 0 ? void 0 : error.name) === 'ZodError') {
            return res.status(400).json({
                success: false,
                message: 'Server side error',
                error: {
                    code: 400,
                    description: JSON.stringify(error === null || error === void 0 ? void 0 : error.issues[0])
                },
            });
        }
        else if ((error === null || error === void 0 ? void 0 : error.code) === 11000) {
            return res.status(400).json({
                success: false,
                message: 'Bad request, user already exists!',
                error: {
                    code: 11000,
                    description: `Duplicate field found, ${Object.keys(error === null || error === void 0 ? void 0 : error.keyValue)[0]} - ${error === null || error === void 0 ? void 0 : error.keyValue[Object.keys(error === null || error === void 0 ? void 0 : error.keyValue)[0]]}`
                },
            });
        }
        else {
            return res.status(500).json({
                success: false,
                message: 'Server side error',
                error: {
                    code: 500,
                    description: 'Server side error',
                },
            });
        }
    }
});
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield user_service_1.UserServices.getAllUserFromDB();
        if ((result === null || result === void 0 ? void 0 : result.length) === 0) {
            return res.status(404).json({
                success: false,
                message: "User not found",
                error: {
                    code: 404,
                    description: "User not found!"
                }
            });
        }
        return res.status(200).json({
            success: true,
            message: "Users fetched successfully!",
            data: result,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Server side error',
            error: {
                code: 500,
                description: 'Server side error',
            },
        });
    }
});
const getSingleUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const result = yield user_service_1.UserServices.getSingleUserFromDB(Number(userId));
        if (!result) {
            return res.status(404).json({
                success: false,
                message: "User not found",
                error: {
                    code: 404,
                    description: "User not found!"
                }
            });
        }
        return res.status(200).json({
            success: true,
            message: "User fetched successfully!",
            data: result,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Server side error',
            error: {
                code: 500,
                description: 'Server side error',
            },
        });
    }
});
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        // user checking from database by using static method
        const isUserExists = yield user_service_1.UserServices.checkUserExistsOrNotFromDB(Number(userId));
        if (!isUserExists) {
            return res.status(404).json({
                success: false,
                message: "User not found",
                error: {
                    code: 404,
                    description: "User not found!"
                }
            });
        }
        // user delete from database
        const result = yield user_service_1.UserServices.deleteUserFromDB(Number(userId));
        if ((result === null || result === void 0 ? void 0 : result.deletedCount) >= 1 && (result === null || result === void 0 ? void 0 : result.acknowledged) === true) {
            return res.status(200).json({
                success: true,
                message: "User deleted successfully!",
                data: null
            });
        }
        else {
            return res.status(400).json({
                success: false,
                message: "Failed! please try again",
                data: null
            });
        }
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Server side error',
            error: {
                code: 500,
                description: 'Server side error',
            },
        });
    }
});
// Product order
const addProductInOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { body } = req;
        const { userId } = req.params;
        // user checking from database by using static method
        const isUserExists = yield user_service_1.UserServices.checkUserExistsOrNotFromDB(Number(userId));
        if (!isUserExists) {
            return res.status(404).json({
                success: false,
                message: "User not found",
                error: {
                    code: 404,
                    description: "User not found!"
                }
            });
        }
        // order data validation and after that, append product into orders
        const parsedOrderData = user_validation_1.ordersValidationSchema.parse(body);
        const result = yield user_service_1.UserServices.addProductInOrderIntoDB(Number(userId), parsedOrderData);
        if ((result === null || result === void 0 ? void 0 : result.modifiedCount) >= 1 && (result === null || result === void 0 ? void 0 : result.acknowledged) === true) {
            return res.status(200).json({
                success: true,
                message: "Order created successfully!",
                data: null
            });
        }
        else {
            return res.status(400).json({
                success: false,
                message: "Failed! please try again",
                data: null
            });
        }
    }
    catch (error) {
        if ((error === null || error === void 0 ? void 0 : error.name) === 'ZodError') {
            return res.status(400).json({
                success: false,
                message: 'Invalid order information',
                error: {
                    code: 400,
                    description: (_a = error === null || error === void 0 ? void 0 : error.issues[0]) === null || _a === void 0 ? void 0 : _a.message
                },
            });
        }
        else {
            return res.status(500).json({
                success: false,
                message: 'Server side error',
                error: {
                    code: 500,
                    description: 'Server side error',
                },
            });
        }
    }
});
const getAllOrdersForSpecificUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        // user checking from database by using static method
        const isUserExists = yield user_service_1.UserServices.checkUserExistsOrNotFromDB(Number(userId));
        if (!isUserExists) {
            return res.status(404).json({
                success: false,
                message: "User not found",
                error: {
                    code: 404,
                    description: "User not found!"
                }
            });
        }
        // get users order information
        const result = yield user_service_1.UserServices.getAllOrdersForSpecificUserFromDB(Number(userId));
        return res.status(200).json({
            success: true,
            message: "Order fetched successfully!",
            data: result,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Server side error',
            error: {
                code: 500,
                description: 'Server side error',
            },
        });
    }
});
const totalPriceForSpecificUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        // user checking from database by using static method
        const isUserExists = yield user_service_1.UserServices.checkUserExistsOrNotFromDB(Number(userId));
        if (!isUserExists) {
            return res.status(404).json({
                success: false,
                message: "User not found",
                error: {
                    code: 404,
                    description: "User not found!"
                }
            });
        }
        // get total price of user
        const result = yield user_service_1.UserServices.totalPriceForSpecificUser(Number(userId));
        return res.status(200).json({
            success: true,
            message: "Total price calculated successfully!",
            data: result,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Server side error',
            error: {
                code: 500,
                description: 'Server side error',
            },
        });
    }
});
exports.UserController = {
    createUser,
    getAllUsers,
    getSingleUser,
    deleteUser,
    updateUser,
    addProductInOrder,
    getAllOrdersForSpecificUser,
    totalPriceForSpecificUser
};
