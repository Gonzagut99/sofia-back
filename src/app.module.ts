import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { RepositoryModule } from './persistence/repository.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import googleOauthConfig from './auth/config/google-oauth.config';
import { StripeModule } from '@golevelup/nestjs-stripe';
import { envs } from './config';
import { SubscriptionModule } from './subscription/subscription.module';

@Module({
  imports: [
    UsersModule, 
    RepositoryModule, 
    AuthModule, SubscriptionModule, 
    // ConfigModule.forRoot(
    //   {
    //     isGlobal: true,
    //     expandVariables: true,
    //     load:[googleOauthConfig]
    //   },
    // )
    // StripeModule.forRoot(StripeModule, {
    //   apiKey: envs.stripeSecretKey,
    //   // webhookConfig: {
    //   //   stripeSecrets: {
    //   //     account: 'whsec_***',
    //   //     accountTest: 'whsec_***',
    //   //     connect: 'whsec_***',
    //   //     connectTest: 'whsec_***',
    //   //   },
    //   // },
    // }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
