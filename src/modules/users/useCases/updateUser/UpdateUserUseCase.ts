import { Users as User } from '@prisma/client';
import { inject, injectable } from "tsyringe";
import { hash, compare } from 'bcryptjs';
import { AppError } from "../../../../shared/errors/AppError";

import { IUserRepository } from '../../repositories/IUserRepository';
import { IUpdateUserDTO } from '../../dtos/IUpdateUserDTO';

@injectable()
export class UpdateUserUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  async execute({ user_id, name, email, old_password, password }: IUpdateUserDTO): Promise<User> {
    const user = await this.userRepository.findById(user_id)

    if (!user) {
      throw new AppError('User not found!', 404);
    }

    const userWithEmailExists = await this.userRepository.findByEmail(email);

    if (userWithEmailExists && userWithEmailExists.id !== user_id) {
      throw new AppError('E-mail already in use!', 401);
    }

    user.name = name;
    user.email = email;

    if (password && old_password) {
      const checkUserOldPassword = await compare(
        old_password,
        user.password,
      );

      if (!checkUserOldPassword) {
        throw new AppError(
          'You need to inform the old password correct to set a new password!', 401
        );
      }

      user.password = await hash(password, 10)
    }

    const userUpdated = await this.userRepository.update(user)

    return userUpdated
  }
}
