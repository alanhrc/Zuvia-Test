import { Pokemons as Pokemon } from '@prisma/client';
import { ICreatePokemonDTO } from '../dtos/ICreatePokemonDTO';
import { IUpdatePokemonDTO } from '../dtos/IUpdatePokemonDTO';

export interface IPokemonRepository {
  findAll(): Promise<Pokemon[]>
  findById: (pokemon_id: string) => Promise<Pokemon | null>;
  findByApiId: (pokemon_id: number) => Promise<Pokemon | null>;
  create({id_poke_api, name, weight, height}: ICreatePokemonDTO): Promise<Pokemon>
  update({pokemon_id, id_poke_api, name, weight, height}: IUpdatePokemonDTO): Promise<Pokemon>
  delete(pokemon_id: string): Promise<void>
}
