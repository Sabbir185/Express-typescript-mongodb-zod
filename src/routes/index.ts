import { Router } from 'express';
import userRoutes from '../modules/user/user.routes';

const apiRouters = Router();

apiRouters.use('/users', userRoutes);

export default apiRouters;
