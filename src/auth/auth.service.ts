import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt'
import { ConfigType } from '@nestjs/config';
import * as argon2 from 'argon2'
import { UsersService } from 'src/users/users.service';
import { CreateGoogleUserDTO } from 'src/users/dto/create-user.dto';
import { comparePassword } from '../utils/encryption';
import { ValidatedUserData } from './types/validations';
import { AuthJwtPayload } from './types/auth-jwtPayload';
import refreshJwtConfig from './config/refresh-jwt.config';

@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
        private jwtService: JwtService,
        @Inject(refreshJwtConfig.KEY) 
        private refreshTokenConfig: ConfigType<typeof refreshJwtConfig>
    ) {}

    async validateUser(email: string, password: string): Promise<ValidatedUserData> {
        const user = await this.userService.findUserByEmail(email);
        if (!user) {
            throw new UnauthorizedException("Usuario no encontrado");
        }

        const isPasswordMatch = comparePassword(password, user.password);
        if (!isPasswordMatch) {
            throw new UnauthorizedException("Credenciales inválidas");
        }

        return {
            id: user.id,
            name: user.name,
            email: user.email
        };
    }

    async generateTokens(userId: string) { //Creation of tokens might take time
        const payload:AuthJwtPayload = { sub: userId };
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(payload),
            this.jwtService.signAsync(payload, this.refreshTokenConfig)
        ]);
        return {
            accessToken: accessToken,
            refreshToken: refreshToken
        }
    }

    async login(userId: string) {
        const { accessToken, refreshToken } = await this.generateTokens(userId);
        const hashedRefreshToken = await argon2.hash(refreshToken); //argo2 is better than bcript at hashing long strings
        await this.userService.updateHashedRefreshToken(userId, hashedRefreshToken);
        return {
            id: userId,
            accessToken,
            refreshToken
        }
    }

    // Method passed to the RefreshTokenStrategy to validate the refresh token in the db
    async validateRefreshToken(userId: string, refreshToken: string) {
        const user = await this.userService.findUserById(userId);
        if(!user || !user.hashedRefreshToken) {
            throw new UnauthorizedException('Invalid refresh token');
        }

        const refreshTokenMatches = await argon2.verify(user.hashedRefreshToken, refreshToken);
        if(!refreshTokenMatches) {
            throw new UnauthorizedException('Invalid refresh token');
        }
        return { id: userId };
    }

    async refreshToken(userId: string) {
        const { accessToken, refreshToken } = await this.generateTokens(userId);
        const hashedRefreshToken = await argon2.hash(refreshToken);
        await this.userService.updateHashedRefreshToken(userId, hashedRefreshToken);
        return {
            id: userId,
            accessToken,
            refreshToken // We return the new refresh token to apply refreshToken rotation
        }
    }

    async signOut(userId: string) {
        //We revoked the refresh token by setting it to null
        // We can do the same with the access token when is of long-term lifespan
        return this.userService.updateHashedRefreshToken(userId, null);
    }

    async validateGoogleUser(googleUser:CreateGoogleUserDTO): Promise<any> {
        const { email } = googleUser;
        const dbUser = await this.userService.findUserByEmail(email);
        if(!dbUser) {
            // const newUser = await this.userService.createUserFromGoogle(user);
            // return this.generateJwtToken(newUser);
            return await this.userService.create(googleUser);
        }
        // return this.generateJwtToken(dbUser);
        return dbUser;
    }

    async googleLogin(req: any) {
        if(!req.user) {
            return 'No user from google';
        }
        return req.user.access_token;
    }    

    generateJwtToken(user: any) {
        const payload = { username: user.name || user.username, id: user.id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
