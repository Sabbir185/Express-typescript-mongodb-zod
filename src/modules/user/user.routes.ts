import { Router } from 'express';
import { UserController } from './user.controller';

const userRoutes = Router();
userRoutes.post('/', UserController.createUser);
userRoutes.put('/:userId', UserController.updateUser);
userRoutes.get('/:userId', UserController.getSingleUser);
userRoutes.get('/', UserController.getAllUsers);
userRoutes.delete('/:userId', UserController.deleteUser);

export default userRoutes;
