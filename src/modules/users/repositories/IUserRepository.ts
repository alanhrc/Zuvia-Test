import { Users as User } from '@prisma/client';
import { ICreateUserDTO } from '../dtos/ICreateUserDTO';

export interface IUserRepository {
  create: ({name, email, password}: ICreateUserDTO) => Promise<User>
  findByEmail: (email: string) => Promise<User | null>;
  findById: (user_id: string) => Promise<User | null>;
  update: (user: User) => Promise<User>
}
