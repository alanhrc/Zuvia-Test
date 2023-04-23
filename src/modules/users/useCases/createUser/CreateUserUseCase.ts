import { Users as User } from '@prisma/client';
import { inject, injectable } from "tsyringe";
import { hash } from 'bcryptjs';
import { AppError } from '../../../../shared/errors/AppError';

import { IUserRepository } from '../../repositories/IUserRepository';
import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject('UserRepository')
    private usersRepository: IUserRepository,
  ) {}

  async execute({ name, email, password }: ICreateUserDTO): Promise<User> {
    const userAlreadyExists = await this.usersRepository.findByEmail(email)

    if (userAlreadyExists) {
      throw new AppError('E-mail already exists', 401);
    }
    const hashPassword = await hash(password, 10)

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashPassword
    })

    return user
  }
}
