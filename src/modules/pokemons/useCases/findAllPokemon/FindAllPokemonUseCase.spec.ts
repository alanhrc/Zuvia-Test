import  'reflect-metadata'
import { FindAllPokemonUseCase } from './FindAllPokemonUseCase';
import { PokemonRepositoryInMemory } from '../../repositories/InMemory/PokemonRepositoryInMemory';
import { CreatePokemonUseCase } from '../createPokemon/CreatePokemonUseCase';

let findAllPokemonUseCase: FindAllPokemonUseCase;
let createPokemonUseCase: CreatePokemonUseCase;
let pokemonRepositoryInMemory: PokemonRepositoryInMemory;

describe('Find All Pokemons', () => {
  beforeEach(() => {
    pokemonRepositoryInMemory = new PokemonRepositoryInMemory()
    createPokemonUseCase = new CreatePokemonUseCase(pokemonRepositoryInMemory);
    findAllPokemonUseCase = new FindAllPokemonUseCase(pokemonRepositoryInMemory);
  });

  it('Should be able to list all pokemons', async () => {
    await createPokemonUseCase.execute({
      id_poke_api: 1333,
      name: "Pokemon novo",
      weight: 122,
      height: 40
    })

    await createPokemonUseCase.execute({
      id_poke_api: 1334,
      name: "Pokemon novo 2",
      weight: 122,
      height: 40
    })

    const pokemons = await findAllPokemonUseCase.execute()

    expect(Array.isArray(pokemons)).toBe(true);
    expect(
      pokemons.every(pokemon => pokemon.hasOwnProperty('id')),
    ).toBe(true);
  })
})
