import { Router } from 'express';
import { UserController } from './user.controller';

const userRoutes = Router();
userRoutes.post('/', UserController.createUser);
userRoutes.put('/:userId', UserController.updateUser);
userRoutes.get('/:userId', UserController.getSingleUser);
userRoutes.get('/', UserController.getAllUsers);
userRoutes.delete('/:userId', UserController.deleteUser);

// order
userRoutes.put('/:userId/orders', UserController.addProductInOrder);
userRoutes.get('/:userId/orders', UserController.getAllOrdersForSpecificUser);
userRoutes.get('/:userId/orders/total-price', UserController.totalPriceForSpecificUser);

export default userRoutes;
