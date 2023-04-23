import  'reflect-metadata'
import { AppError } from "../../../../shared/errors/AppError";
import { PokemonRepositoryInMemory } from '../../repositories/InMemory/PokemonRepositoryInMemory';
import { CreatePokemonUseCase } from './CreatePokemonUseCase';

let createPokemonUseCase: CreatePokemonUseCase;
let pokemonRepositoryInMemory: PokemonRepositoryInMemory;

describe('Crate Pokemon', () => {
  beforeEach(() => {
    pokemonRepositoryInMemory = new PokemonRepositoryInMemory()
    createPokemonUseCase = new CreatePokemonUseCase(pokemonRepositoryInMemory);
  });

  it('Should be able to create a pokemon', async () => {
    const pokemon = await createPokemonUseCase.execute({
      id_poke_api: 1333,
      name: "Pokemon novo",
      weight: 122,
      height: 40
    })

    expect(pokemon).toHaveProperty('id');
    expect(pokemon).toHaveProperty('name');
    expect(pokemon).toHaveProperty('weight');
    expect(pokemon).toHaveProperty('height');
  })

  it('Should not be able to create a pokemon with same id api', async () => {
    await createPokemonUseCase.execute({
      id_poke_api: 1333,
      name: "Pokemon novo",
      weight: 122,
      height: 40
    })

    await expect(createPokemonUseCase.execute({
      id_poke_api: 1333,
      name: "Pokemon novo",
      weight: 122,
      height: 40
    })).rejects.toBeInstanceOf(AppError)
  })
})
