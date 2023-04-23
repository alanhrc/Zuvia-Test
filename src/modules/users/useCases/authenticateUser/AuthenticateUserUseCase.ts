import { inject, injectable } from "tsyringe";
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { AppError } from "../../../../shared/errors/AppError";

import authConfig from '../../../../config/auth';

import { IUserRepository } from "../../repositories/IUserRepository";
import { IAuthenticateUserDTO } from "../../dtos/IAuthenticateUserDTO";

interface IRequest {
  email: string;
  password: string;
}

@injectable()
export class AuthenticateUserUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  async execute({ email, password }: IRequest): Promise<IAuthenticateUserDTO> {
    const user = await this.userRepository.findByEmail(email);

    if(!user) {
      throw new AppError('E-mail or password incorrect!');
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError('E-mail or password incorrect!');
    }

    const { secret, expiresIn } = authConfig.jwt;

    const user_id = user.id

    const userWithoutPassword = {
      id: user.id,
      name: user.name,
      email: user.email
    }

    const token = sign({ user_id }, `${secret}`, {
      subject: user.id,
      expiresIn,
    });

    return { user: userWithoutPassword, token }
  }
}
