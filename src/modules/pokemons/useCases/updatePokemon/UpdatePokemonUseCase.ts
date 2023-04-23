import { Pokemons as Pokemon } from '@prisma/client';
import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";

import { IPokemonRepository } from '../../repositories/IPokemonRepository';
import { IUpdatePokemonDTO } from '../../dtos/IUpdatePokemonDTO';

@injectable()
export class UpdatePokemonUseCase {
  constructor(
    @inject('PokemonRepository')
    private pokemonRepository: IPokemonRepository,
  ) {}

  async execute({ pokemon_id, id_poke_api, name, weight, height }: IUpdatePokemonDTO): Promise<Pokemon> {
    const pokemonFound = await this.pokemonRepository.findById(pokemon_id)

    if (!pokemonFound) {
      throw new AppError('Pokemon not found!', 404);
    }

    if(id_poke_api) {
      const pokemonWithIdApiExists = await this.pokemonRepository.findByApiId(id_poke_api);

      if (pokemonWithIdApiExists) {
        throw new AppError('Pokemon id api already exists in database!', 401);
      }
    }

    const pokemonUpdated = await this.pokemonRepository.update({
      pokemon_id,
      id_poke_api,
      name,
      weight,
      height
    })

    return pokemonUpdated
  }
}
