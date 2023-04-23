import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";

import { IPokemonRepository } from "../../repositories/IPokemonRepository";

@injectable()
export class DeletePokemonUseCase {
  constructor(
    @inject('PokemonRepository')
    private pokemonRepository: IPokemonRepository,
  ) {}

  async execute(pokemon_id: string): Promise<void> {
    const pokemonFound = await this.pokemonRepository.findById(pokemon_id);

    if(!pokemonFound) {
      throw new AppError('Pokemon not found!', 404);
    }

    await this.pokemonRepository.delete(pokemonFound.id)
  }
}
