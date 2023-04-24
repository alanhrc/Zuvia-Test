import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { FindPokemonUseCase } from './FindPokemonUseCase';

export class FindPokemonController {
  async execute(request: Request, response: Response) {
    const { pokemon_id } = request.params

    const findPokemonUseCase = container.resolve(FindPokemonUseCase);

    const pokemon = await findPokemonUseCase.execute(pokemon_id);

    return response.status(200).json({pokemon});
  }
}
