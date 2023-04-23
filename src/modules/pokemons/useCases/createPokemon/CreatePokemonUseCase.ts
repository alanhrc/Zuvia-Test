import { inject, injectable } from "tsyringe";
import { Pokemons as Pokemon } from "@prisma/client";
import { AppError } from "../../../../shared/errors/AppError";

import { IPokemonRepository } from "../../repositories/IPokemonRepository";
import { ICreatePokemonDTO } from "../../dtos/ICreatePokemonDTO";

@injectable()
export class CreatePokemonUseCase {
  constructor(
    @inject('PokemonRepository')
    private pokemonRepository: IPokemonRepository,
  ) {}

  async execute({ id_poke_api, name, weight, height }: ICreatePokemonDTO): Promise<Pokemon> {
    const pokemonFound = await this.pokemonRepository.findByApiId(id_poke_api)

    if(pokemonFound) {
      throw new AppError('Pokemon id api already exists', 401);
    }

    const pokemon = await this.pokemonRepository.create({
      id_poke_api,
      name,
      weight,
      height
    });

    return pokemon
  }
}
