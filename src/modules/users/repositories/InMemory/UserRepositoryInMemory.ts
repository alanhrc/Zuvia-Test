import { randomUUID } from 'node:crypto'
import { Users as User } from '@prisma/client'

import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { IUserRepository } from "../IUserRepository";

export class UserRepositoryInMemory implements IUserRepository {
  private users: User[] = [];

  async findByEmail(email: string): Promise<User | null> {
    const findUser = this.users.find(user => user.email === email);

    return findUser || null;
  }

  async findById(user_id: string): Promise<User | null> {
    const findUser = this.users.find(user => user.id === user_id);

    return findUser || null;
  }

  async create({ name, email, password }: ICreateUserDTO): Promise<User> {
    const user = {
      id: randomUUID(),
      name,
      email,
      password,
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null
    }

    this.users.push(user);

    return user;
  }

  async update(user: User): Promise<User> {
    const findIndex = this.users.findIndex(findUser => findUser.id === user.id);

    this.users[findIndex] = user;

    return user;
  }
}
