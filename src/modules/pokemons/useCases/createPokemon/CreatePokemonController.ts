import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreatePokemonUseCase } from './CreatePokemonUseCase';

export class CreatePokemonController {
  async execute(request: Request, response: Response) {
    const createPokemonUseCase = container.resolve(CreatePokemonUseCase);

    const { id_poke_api, name, weight, height } = request.body

    const pokemon = await createPokemonUseCase.execute({
      id_poke_api,
      name,
      weight,
      height
    });

    return response.status(200).json({pokemon});
  }
}
