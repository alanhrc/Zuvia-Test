import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { FindAllPokemonUseCase } from './FindAllPokemonUseCase';

export class FindAllPokemonController {
  async execute(request: Request, response: Response) {
    const findAllPokemonUseCase = container.resolve(FindAllPokemonUseCase);

    const pokemons = await findAllPokemonUseCase.execute();

    return response.status(200).json({pokemons});
  }
}
