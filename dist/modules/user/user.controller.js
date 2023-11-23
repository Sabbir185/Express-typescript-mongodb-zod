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
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { student: studentData } = req.body;
        const result = yield user_service_1.UserServices.createUserIntoDB(studentData);
        return res.status(200).json({
            error: false,
            msg: 'Student is created successfully',
            data: result,
        });
    }
    catch (error) {
        console.log(error);
    }
});
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { student: studentData } = req.body;
        const result = yield user_service_1.UserServices.createUserIntoDB(studentData);
        return res.status(200).json({
            error: false,
            msg: 'Student is created successfully',
            data: result,
        });
    }
    catch (error) {
        console.log(error);
    }
});
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield user_service_1.UserServices.getAllUserFromDB();
        return res.status(200).json({
            error: false,
            msg: 'Success',
            data: result,
        });
    }
    catch (error) {
        console.log(error);
    }
});
const getSingleUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { studentId } = req.params;
        const result = yield user_service_1.UserServices.getSingleUserFromDB(studentId);
        return res.status(200).json({
            error: false,
            msg: 'Success',
            data: result,
        });
    }
    catch (error) {
        console.log(error);
    }
});
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { studentId } = req.params;
        const result = yield user_service_1.UserServices.getSingleUserFromDB(studentId);
        return res.status(200).json({
            error: false,
            msg: 'Success',
            data: result,
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.UserController = {
    createUser,
    getAllUsers,
    getSingleUser,
    deleteUser,
    updateUser
};
