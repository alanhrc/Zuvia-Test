import { container } from 'tsyringe';

import { IUserRepository } from '../../modules/users/repositories/IUserRepository';
import { UserRepository } from '../../modules/users/repositories/UserRepository';

import { IPokemonRepository } from '../..//modules/pokemons/repositories/IPokemonRepository';
import { PokemonRepository } from '../../modules/pokemons/repositories/PokemonRepository';

container.registerSingleton<IUserRepository>(
  'UserRepository',
  UserRepository
);

container.registerSingleton<IPokemonRepository>(
  'PokemonRepository',
  PokemonRepository
);
