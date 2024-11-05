import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AuthJwtPayload } from "../types/auth-jwtPayload";
import { ConfigType } from "@nestjs/config";
import { Inject, Injectable } from "@nestjs/common";
import refreshJwtConfig from "../config/refresh-jwt.config";
import { Request } from "express"; //important to import this from express
import { AuthService } from "../auth.service";

@Injectable()
export class RefreshJwtStrategy extends PassportStrategy(Strategy, 'refresh-jwt') {
    constructor(
       @Inject(refreshJwtConfig.KEY) 
       private refreshJwtConfiguration: ConfigType<typeof refreshJwtConfig>,
       private readonly authService: AuthService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: refreshJwtConfiguration.secret,
            passReqToCallback: true
        });
    }
    //Authrization: Bearer <token>
    async validate(req:Request, payload: AuthJwtPayload) {
        const refreshToken = req.get('Authorization').split(' ')[1]; //Bearer <token>
        const userId = payload.sub;

        //JWTStrategy will append this object to the user object wich will enable in the request objexct through the guard
        return this.authService.validateRefreshToken(userId, refreshToken);
    }
}