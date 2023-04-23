import { Router } from 'express';

import { authRouter } from './sessions.routes';
import { userRouter } from './users.routes';
import { pokemonRouter } from './pokemons.routes';

const router = Router();

router.use('/sessions', authRouter);
router.use('/users', userRouter);
router.use('/pokemons', pokemonRouter);

export { router };
