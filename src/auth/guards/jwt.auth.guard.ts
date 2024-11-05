import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    constructor( private reflector: Reflector) {
        super()
    }
    canActivate(context: ExecutionContext){
        //Reads the metadata from the route handler
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            //Handles is put first to give it priority to check the decorator
            context.getHandler(), //checks if the API handler (the specific endpoint) is decorated with the @Public() decorator return true
            context.getClass() //checks if the class (the class controller) is decorated with the @Public() decorator
        ]);
        if(isPublic) return true;
        return super.canActivate(context); //If the route handler is not decorated with the @Public() decorator, the canActivate() method of the JwtAuthGuard class is called
    }
}