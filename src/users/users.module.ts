import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { RepositoryModule } from '../persistence/repository.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [RepositoryModule],
  exports: [UsersService],
})
export class UsersModule {}
