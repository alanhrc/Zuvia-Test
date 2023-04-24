import  'reflect-metadata'
import { AppError } from "../../../../shared/errors/AppError";

import { PokemonRepositoryInMemory } from '../../../../modules/pokemons/repositories/InMemory/PokemonRepositoryInMemory';
import { CreatePokemonUseCase } from '../../../../modules/pokemons/useCases/createPokemon/CreatePokemonUseCase';
import { FindPokemonUseCase } from './FindPokemonUseCase';

let findPokemonUseCase: FindPokemonUseCase;
let createPokemonUseCase: CreatePokemonUseCase;
let pokemonRepositoryInMemory: PokemonRepositoryInMemory;

describe('Find Pokemon', () => {
  beforeEach(() => {
    pokemonRepositoryInMemory = new PokemonRepositoryInMemory()
    createPokemonUseCase = new CreatePokemonUseCase(pokemonRepositoryInMemory);
    findPokemonUseCase = new FindPokemonUseCase(pokemonRepositoryInMemory);
  });

  it('Should be able to find a pokemon', async () => {
    const pokemon = await createPokemonUseCase.execute({
      id_poke_api: 1333,
      name: "Pokemon novo",
      weight: 122,
      height: 40
    });

    const pokemonFound = await findPokemonUseCase.execute(pokemon.id)

    expect(pokemonFound.id_poke_api).toBe(1333)
    expect(pokemonFound.name).toBe('Pokemon novo')
    expect(pokemonFound.weight).toBe(122)
    expect(pokemonFound.height).toBe(40)
  })

  it('Should not be able to find a pokemon with existent id api', async () => {

    await expect(findPokemonUseCase.execute('wrong-id')).rejects.toBeInstanceOf(AppError)
  })
})
