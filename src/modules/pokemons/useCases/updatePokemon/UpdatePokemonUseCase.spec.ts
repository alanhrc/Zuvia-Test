import  'reflect-metadata'
import { AppError } from "../../../../shared/errors/AppError";

import { UpdatePokemonUseCase } from '../../../../modules/pokemons/useCases/updatePokemon/UpdatePokemonUseCase';
import { PokemonRepositoryInMemory } from '../../../../modules/pokemons/repositories/InMemory/PokemonRepositoryInMemory';
import { CreatePokemonUseCase } from '../../../../modules/pokemons/useCases/createPokemon/CreatePokemonUseCase';

let updatePokemonUseCase: UpdatePokemonUseCase;
let createPokemonUseCase: CreatePokemonUseCase;
let pokemonRepositoryInMemory: PokemonRepositoryInMemory;

describe('Update Pokemon', () => {
  beforeEach(() => {
    pokemonRepositoryInMemory = new PokemonRepositoryInMemory()
    createPokemonUseCase = new CreatePokemonUseCase(pokemonRepositoryInMemory);
    updatePokemonUseCase = new UpdatePokemonUseCase(pokemonRepositoryInMemory);
  });

  it('Should be able to update a pokemon', async () => {
    const pokemon = await createPokemonUseCase.execute({
      id_poke_api: 1333,
      name: "Pokemon novo",
      weight: 122,
      height: 40
    });

    const pokemonUpdated = await updatePokemonUseCase.execute({
      pokemon_id: pokemon.id,
      id_poke_api: 1334,
      name: "Pokemon novo updated",
      weight: 123,
      height: 41
    })

    expect(pokemonUpdated.id_poke_api).toBe(1334)
    expect(pokemonUpdated.name).toBe('Pokemon novo updated')
    expect(pokemonUpdated.weight).toBe(123)
    expect(pokemonUpdated.height).toBe(41)
  })

  it('Should not be able to update a pokemon with existent id api', async () => {
    await createPokemonUseCase.execute({
      id_poke_api: 1333,
      name: "Pokemon novo",
      weight: 122,
      height: 40
    });

    const pokemon = await createPokemonUseCase.execute({
      id_poke_api: 1334,
      name: "Pokemon novo",
      weight: 122,
      height: 40
    });

    await expect(updatePokemonUseCase.execute({
      pokemon_id: pokemon.id,
      id_poke_api: 1333,
      name: "Pokemon novo",
      weight: 122,
      height: 40
    })).rejects.toBeInstanceOf(AppError)
  })

  it('Should not be able to update a pokemon with inexistent id', async () => {
    await expect(updatePokemonUseCase.execute({
      pokemon_id: 'wrong-id',
      id_poke_api: 1333,
      name: "Pokemon novo",
      weight: 122,
      height: 40
    })).rejects.toBeInstanceOf(AppError)
  })
})
