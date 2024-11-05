import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt'
import googleOauthConfig from './config/google-oauth.config';
import { GoogleStrategy } from './strategies/google.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { RefreshJwtStrategy } from './strategies/refresh.strategy';
import jwtConfig from './config/jwt.config';
import refreshJwtConfig from './config/refresh-jwt.config';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './guards/jwt.auth.guard';

@Module({
    imports : [
        UsersModule,
        JwtModule.registerAsync(jwtConfig.asProvider()), //We use the generative function asProvider to register the configuration object as a provider
        ConfigModule.forFeature(jwtConfig),
        ConfigModule.forFeature(refreshJwtConfig),
        ConfigModule.forFeature(googleOauthConfig)  
    ],
    providers: [
        AuthService, 
        LocalStrategy, 
        JwtStrategy, 
        RefreshJwtStrategy,
        GoogleStrategy,
        {
            provide:APP_GUARD,
            useClass:JwtAuthGuard //@UseGuards(JwtAuthGuard) applied on all API endpoints
        },
        //We can add more global guards here
        // {
        //     provide:APP_GUARD,
        //     useClass:RoleGuard
        // }
    ],
    controllers: [AuthController]
})
export class AuthModule {}
