import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from 'src/persistence/repository/user.repository';
import { last } from 'rxjs';

@Injectable()
export class UsersService{
  constructor(
    private readonly repository: UserRepository
  ) {}

  async create(data: CreateUserDto) {
    return this.repository.createUser(data);
  }

  async createUserFromGoogle(data: any) {
    return this.repository.createUser({
      name: data.givename || data.username,
      lastname: data.lastName,
      email: data.email,
    });
  }

  async findUserById(id: string) {
    return this.repository.findUserById(id);
  }

  async findUserByEmail(email: string) {
    return this.repository.findUserByEmail(email);
  }

  async findUserByCustomerId(customerId: string) {
    return this.repository.user.findFirst({
      where: {
        customerId: customerId,
      },
    });
  }

  async findAll() {
    return this.repository.user.findMany();
  }

  async findOne(id: string) {
    return this.repository.findUserById(id);
  }

  async update(id: string, data: UpdateUserDto) {
    return this.repository.updateUser(id, data);
  }

  async remove(id: string) {
    return this.repository.deleteUser(id);
  }

  async updateHashedRefreshToken(userId: string, hashedRefreshToken: string) {
    return this.repository.updateUser(userId, { hashedRefreshToken });
  }
}
