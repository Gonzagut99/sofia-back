import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from 'passport-local';
import { AuthService } from "../auth.service";
import { Injectable } from "@nestjs/common";
import { ValidatedUserData } from "../types/validations";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy,'local') {
    constructor(private authService: AuthService) {
        super(
            {
                usernameField: 'email',
                passwordField: 'password'
            }
        );
    }

    async validate(email: string, password: string): Promise<ValidatedUserData> {
        return await this.authService.validateUser(email, password);
    }
}