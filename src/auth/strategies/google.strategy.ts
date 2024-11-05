import { Inject, Injectable } from "@nestjs/common";
import { Strategy, VerifyCallback} from 'passport-google-oauth20';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from "@nestjs/passport";
import { AuthService } from "../auth.service";
import googleOauthConfig from "../config/google-oauth.config";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy,"google"){
    constructor(
        @Inject(googleOauthConfig.KEY) 
        private googleConfiguration: ConfigType<typeof googleOauthConfig>,
        private readonly authService: AuthService
    ){
        //console.log(googleConfiguration.clientID)
        super(
            {
                clientID: googleConfiguration.clientID,
                clientSecret: googleConfiguration.clientSecret,
                callbackURL: googleConfiguration.callbackURL,
                passReqToCallback: true,
                scope: ['email', 'profile']
            }
        )
    }

    async validate(
        req: Request,
        accessToken: string, //this comes from google, we dont use it
        refreshToken: string, //this comes from google, we dont use it
        profile: any, //profile comes from what google sends
    ): Promise<any>{
        // console.log(JSON.stringify(profile, null, 2));
        console.log({profile});
        try{
            const email = profile?.emails?.[0]?.value || null;
            const lastname = profile?.name?.familyName || 'NoLastName';
            const avatarUrl = profile?.photos?.[0]?.value || null;
            const name = profile.name.givenName;
            const dbUser = await this.authService.validateGoogleUser({
                username: email.split('@')[0],
                email,
                name,
                lastname,
                avatarUrl,
                password: '',
            });
            //done(null, dbUser); //not pass the profil but our domain 
            //done is not a function ocurre porque en NestJS, cuando implementas una estrategia con Passport, no necesitas usar el callback
            return dbUser;
        }
        catch(error){
            //done(error, false);
            throw error;
        }
    }
}