import { Pokemons as Pokemon } from '@prisma/client';
import { prisma } from '../../../infra/database/prisma';

import { IPokemonRepository } from './IPokemonRepository';
import { ICreatePokemonDTO } from '../dtos/ICreatePokemonDTO';
import { IUpdatePokemonDTO } from '../dtos/IUpdatePokemonDTO';

export class PokemonRepository implements IPokemonRepository {
  async findAll(): Promise<Pokemon[]> {
    const pokemons = await prisma.pokemons.findMany()

    return pokemons
  }

  async findById(pokemon_id: string): Promise<Pokemon | null> {
    const pokemon = await prisma.pokemons.findUnique({
      where: {
        id: pokemon_id
      }
    })

    return pokemon
  }

  async findByApiId(pokemon_id: number): Promise<Pokemon | null> {
    const pokemon = await prisma.pokemons.findUnique({
      where: {
        id_poke_api: pokemon_id
      }
    })

    return pokemon
  }

  async create({ id_poke_api, name, weight, height }: ICreatePokemonDTO): Promise<Pokemon> {
    const pokemon = await prisma.pokemons.create({
      data: {
        id_poke_api,
        name,
        weight,
        height
      }
    })

    return pokemon
  }

  async update({pokemon_id, id_poke_api, name, weight, height}: IUpdatePokemonDTO): Promise<Pokemon> {
    const pokemonUpdated = await prisma.pokemons.update({
      where: {
        id: pokemon_id
      },
      data: {
        id_poke_api,
        name,
        weight,
        height,
      }
    })

    return pokemonUpdated
  }

  async delete(pokemon_id: string): Promise<void> {
    await prisma.pokemons.delete({
      where: {
        id: pokemon_id
      }
    })
  }
}
