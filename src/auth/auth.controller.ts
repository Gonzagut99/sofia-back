import { Controller, Get, HttpCode, HttpStatus, Post, Req, Request, Res, UseGuards } from '@nestjs/common';
import { GoogleAuthGuard } from './guards/google-auth.guard';
import { AuthService } from './auth.service';
import { envs } from 'src/config';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { RefreshJwtAuthGuard } from './guards/refresh-jwt.auth.guard';
import { JwtAuthGuard } from './guards/jwt.auth.guard';
import { Public } from './decorators/public.decorator';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
    ) {}

    @Public()
    @HttpCode(HttpStatus.OK)
    @UseGuards(LocalAuthGuard) //Activates the Local Strategy, looks for the email and password in the request body, internally it also activates the JWT Strategy
    @Post('login')
    login(@Request() req) {
        return this.authService.login(req.user.id);
        //return req.user; //Passport authomatically pass the object returned by the validate method 
        //to the request and store it in the req.user property
    }

    @HttpCode(HttpStatus.OK)
    @UseGuards(RefreshJwtAuthGuard) //Activates the RefreshJWT Strategy, looks for the JWToken in the Authorization header of the request
    @Post('refresh')
    async refresh(@Req() req) {
        return this.authService.refreshToken(req.user.id);
    }

    @HttpCode(HttpStatus.OK)
    //JWT Guard is set as a global guard in the AuthModule
    //@UseGuards(JwtAuthGuard) //Activates the RefreshJWT Strategy, looks for the JWToken in the Authorization header of the request
    @Post('logout')
    async logout(@Req() req) {
        return this.authService.signOut(req.user.id);
    }

    @Public()
    @UseGuards(GoogleAuthGuard)
    @Get('google/login')
    googleLogin() {
        // initiates the google login process
    }

    @Public()
    @UseGuards(GoogleAuthGuard)
    @Get('google/callback')
    async googleCallback(@Req() req, @Res() res) {
        const response = await this.authService.login(req.user.id);
        res.redirect(`${envs.frontendUrl}?token=${response.accessToken}`);
        //initiates the google login process
    }

}
