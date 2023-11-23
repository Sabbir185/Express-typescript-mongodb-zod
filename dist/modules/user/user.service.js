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
exports.UserServices = void 0;
const createUserIntoDB = (user) => __awaiter(void 0, void 0, void 0, function* () {
});
const updateUserIntoDB = (user) => __awaiter(void 0, void 0, void 0, function* () {
});
const getAllUserFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
});
const getSingleUserFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
});
const deleteUserFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
});
exports.UserServices = {
    createUserIntoDB,
    getAllUserFromDB,
    getSingleUserFromDB,
    deleteUserFromDB,
    updateUserIntoDB
};
