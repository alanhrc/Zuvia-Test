import { Pokemons as Pokemon } from '@prisma/client';
import { randomUUID } from 'node:crypto'

import { IPokemonRepository } from '../IPokemonRepository';
import { ICreatePokemonDTO } from '../../dtos/ICreatePokemonDTO';
import { IUpdatePokemonDTO } from '../../dtos/IUpdatePokemonDTO';

export class PokemonRepositoryInMemory implements IPokemonRepository {
  private pokemons: Pokemon[] = [];

  async findAll(): Promise<Pokemon[]> {
    return this.pokemons
  }

  async findById(pokemon_id: string): Promise<Pokemon | null> {
    const pokemonFound = this.pokemons.find(pokemon => pokemon.id === pokemon_id);

    return pokemonFound || null;
  }

  async findByApiId(pokemon_id: number): Promise<Pokemon | null> {
    const pokemonFound = this.pokemons.find(pokemon => pokemon.id_poke_api === pokemon_id);

    return pokemonFound || null;
  }

  async create({ id_poke_api, name, weight, height }: ICreatePokemonDTO): Promise<Pokemon> {
    const pokemon: Pokemon = {
      id: randomUUID(),
      id_poke_api,
      name,
      weight,
      height
    }

    this.pokemons.push(pokemon);

    return pokemon;
  }

  async update({pokemon_id, id_poke_api, name, weight, height}: IUpdatePokemonDTO): Promise<Pokemon> {
    const findIndex = this.pokemons.findIndex(pokemonFound => pokemonFound.id === pokemon_id);

    const pokemonUpdated: Pokemon = {
      id: pokemon_id,
      id_poke_api,
      name,
      weight,
      height
    }

    this.pokemons[findIndex] = pokemonUpdated;

    return pokemonUpdated;
  }

  async delete(pokemon_id: string): Promise<void> {
    const pokemon = this.pokemons.findIndex(pokemonFound => pokemonFound.id === pokemon_id);

    this.pokemons.splice(this.pokemons.indexOf(this.pokemons[pokemon]), 1);
  }
}
