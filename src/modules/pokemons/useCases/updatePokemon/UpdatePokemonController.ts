import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UpdatePokemonUseCase } from './UpdatePokemonUseCase';

export class UpdatePokemonController {
  async execute(request: Request, response: Response) {
    const { pokemon_id } = request.params
    const { id_poke_api, name, weight, height } = request.body;

    const updatePokemonUseCase = container.resolve(UpdatePokemonUseCase);

    const pokemonUpdated = await updatePokemonUseCase.execute({
      pokemon_id,
      id_poke_api,
      name,
      weight,
      height
    });

    return response.status(200).json({pokemonUpdated});
  }
}
