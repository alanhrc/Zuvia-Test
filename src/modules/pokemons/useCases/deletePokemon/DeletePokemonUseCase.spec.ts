import  'reflect-metadata'
import { AppError } from '../../../../shared/errors/AppError';
import { PokemonRepositoryInMemory } from '../../repositories/InMemory/PokemonRepositoryInMemory';
import { CreatePokemonUseCase } from '../createPokemon/CreatePokemonUseCase';
import { DeletePokemonUseCase } from './DeletePokemonUseCase';
import { FindAllPokemonUseCase } from '../findAllPokemon/FindAllPokemonUseCase';

let deletePokemonUseCase: DeletePokemonUseCase;
let createPokemonUseCase: CreatePokemonUseCase;
let findAllPokemonUseCase: FindAllPokemonUseCase;
let pokemonRepositoryInMemory: PokemonRepositoryInMemory;

describe('Delete Pokemon', () => {
  beforeEach(() => {
    pokemonRepositoryInMemory = new PokemonRepositoryInMemory()
    createPokemonUseCase = new CreatePokemonUseCase(pokemonRepositoryInMemory);
    findAllPokemonUseCase = new FindAllPokemonUseCase(pokemonRepositoryInMemory);
    deletePokemonUseCase = new DeletePokemonUseCase(pokemonRepositoryInMemory);
  });

  it('Should be able to delete a pokemon', async () => {
    const pokemon = await createPokemonUseCase.execute({
      id_poke_api: 1333,
      name: "Pokemon novo",
      weight: 122,
      height: 40
    })

    const pokemon2 = await createPokemonUseCase.execute({
      id_poke_api: 1334,
      name: "Pokemon novo 2",
      weight: 122,
      height: 40
    })

    await deletePokemonUseCase.execute(pokemon.id)

    const pokemons = await findAllPokemonUseCase.execute()

    expect(pokemons).toEqual([pokemon2]);
  })

  it('Should not be able to delete a pokemon with inexistent id', async () => {
    await expect(deletePokemonUseCase.execute('wrong-id')).rejects.toBeInstanceOf(AppError);
  })
})
