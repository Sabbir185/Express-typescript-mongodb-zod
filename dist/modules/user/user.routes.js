"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("./user.controller");
const userRoutes = (0, express_1.Router)();
userRoutes.post('/', user_controller_1.UserController.createUser);
userRoutes.put('/:userId', user_controller_1.UserController.updateUser);
userRoutes.get('/:userId', user_controller_1.UserController.getSingleUser);
userRoutes.get('/', user_controller_1.UserController.getAllUsers);
userRoutes.delete('/:userId', user_controller_1.UserController.deleteUser);
// order
userRoutes.put('/:userId/orders', user_controller_1.UserController.addProductInOrder);
userRoutes.get('/:userId/orders', user_controller_1.UserController.getAllOrdersForSpecificUser);
userRoutes.get('/:userId/orders/total-price', user_controller_1.UserController.totalPriceForSpecificUser);
exports.default = userRoutes;
