import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { RepositoryModule } from './persistence/repository.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import googleOauthConfig from './auth/config/google-oauth.config';

@Module({
  imports: [
    UsersModule, 
    RepositoryModule, 
    AuthModule, 
    // ConfigModule.forRoot(
    //   {
    //     isGlobal: true,
    //     expandVariables: true,
    //     load:[googleOauthConfig]
    //   },
    // )
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
