import { Router } from 'express';

import { ensureAuthenticated } from '../shared/infra/http/middlewares/ensureAuthenticate';

import { FindAllPokemonController } from '../modules/pokemons/useCases/findAllPokemon/FindAllPokemonController';
import { CreatePokemonController } from '../modules/pokemons/useCases/createPokemon/CreatePokemonController';
import { UpdatePokemonController } from '../modules/pokemons/useCases/updatePokemon/UpdatePokemonController';
import { DeletePokemonController } from '../modules/pokemons/useCases/deletePokemon/DeletePokemonController';
import { FindPokemonController } from '../modules/pokemons/useCases/findPokemon/FindPokemonController';

const pokemonRouter = Router();
const findAllPokemonController = new FindAllPokemonController();
const createPokemonController = new CreatePokemonController();
const updatePokemonController = new UpdatePokemonController();
const deletePokemonController = new DeletePokemonController();
const findPokemonController = new FindPokemonController();

pokemonRouter.use(ensureAuthenticated)
pokemonRouter.get('/', findAllPokemonController.execute);
pokemonRouter.post('/', createPokemonController.execute);
pokemonRouter.put('/:pokemon_id', updatePokemonController.execute);
pokemonRouter.delete('/:pokemon_id', deletePokemonController.execute);
pokemonRouter.get('/:pokemon_id', findPokemonController.execute);

export { pokemonRouter };
