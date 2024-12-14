import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { encryption } from 'src/utils/encryption';

@Injectable()
export class UserRepository
  extends PrismaClient
  implements OnModuleInit
{
  private readonly logger = new Logger(UserRepository.name);

  async onModuleInit() {
    await this.$connect();
    this.logger.log('Connected to the database');
  }

  async createUser(data:any) {
    let actualData
    // This condition happens when the user is created with google
    if (data.password == '') {
      actualData = data
    }else{
      actualData = {...data, password: encryption(data.password)};
    }
    return this.user.create({data: actualData as any});
  }

  async findUserById(id: string) {
    return this.user.findUnique({ where: { id } });
  }

  async findUserByEmail(email: string) {
    return this.user.findUnique({ where: { email } });
  }

  async updateUser(id: string, data: any) {
    return this.user.update({ where: { id }, data });
  }

  async deleteUser(id: string) {
    return this.user.delete({ where: { id } });
  }
}
