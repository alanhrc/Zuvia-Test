import { Pokemons as Pokemon } from '@prisma/client';
import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";

import { IPokemonRepository } from '../../repositories/IPokemonRepository';

@injectable()
export class FindPokemonUseCase {
  constructor(
    @inject('PokemonRepository')
    private pokemonRepository: IPokemonRepository,
  ) {}

  async execute(pokemon_id: string): Promise<Pokemon> {
    const pokemonFound = await this.pokemonRepository.findById(pokemon_id)

    if (!pokemonFound) {
      throw new AppError('Pokemon not found!', 404);
    }

    return pokemonFound
  }
}
