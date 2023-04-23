import { Router } from 'express';

import { ensureAuthenticated } from '../shared/infra/http/middlewares/ensureAuthenticate';

import { CreateUserController } from '../modules/users/useCases/createUser/CreateUserController';
import { UpdateUserController } from '../modules/users/useCases/updateUser/UpdateUserController';

const userRouter = Router();
const createUserController = new CreateUserController();
const updateUserController = new UpdateUserController();

userRouter.post('/', createUserController.execute);
userRouter.put('/', ensureAuthenticated, updateUserController.execute);

export { userRouter };
