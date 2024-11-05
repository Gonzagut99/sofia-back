import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { envs } from "src/config/envs";
import { AuthJwtPayload } from "../types/auth-jwtPayload";
import { ConfigType } from "@nestjs/config";
import jwtConfig from "../config/jwt.config";
import { Inject, Injectable } from "@nestjs/common";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') { //The name which will use the Guard
    constructor(
       @Inject(jwtConfig.KEY) 
       private jwtConfiguration: ConfigType<typeof jwtConfig>
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false, //To apply the expiration time
            secretOrKey: jwtConfiguration.secret,
        });
    }

    async validate(payload: AuthJwtPayload) {
        //JWTStrategy will append this object to the user object wich will enable in the request objexct through the guard
        return { 
            id: payload.sub, 
            //username: payload.username 
        };
    }
}