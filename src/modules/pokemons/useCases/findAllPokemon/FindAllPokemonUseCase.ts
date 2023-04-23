import { inject, injectable } from "tsyringe";
import { Pokemons as Pokemon } from "@prisma/client";

import { IPokemonRepository } from "../../repositories/IPokemonRepository";

@injectable()
export class FindAllPokemonUseCase {
  constructor(
    @inject('PokemonRepository')
    private pokemonRepository: IPokemonRepository,
  ) {}

  async execute(): Promise<Pokemon[]> {
    const pokemons = await this.pokemonRepository.findAll();

    return pokemons
  }
}
