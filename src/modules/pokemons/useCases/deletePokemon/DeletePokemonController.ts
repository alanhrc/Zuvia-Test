import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { DeletePokemonUseCase } from './DeletePokemonUseCase';

export class DeletePokemonController {
  async execute(request: Request, response: Response) {
    const { pokemon_id } = request.params

    const deletePokemonUseCase = container.resolve(DeletePokemonUseCase);

    await deletePokemonUseCase.execute(pokemon_id);

    return response.status(204).json();
  }
}
