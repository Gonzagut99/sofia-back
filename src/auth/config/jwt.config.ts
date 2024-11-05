import { registerAs } from "@nestjs/config";
import { JwtModuleOptions } from "@nestjs/jwt";
import { envs } from "src/config";

export default registerAs(
    'jwt', //this is the KEY feature of the configuration
    (): JwtModuleOptions => ({
        secret: envs.jwtSecretKey,
        signOptions: { 
            expiresIn: envs.jwtExpiresIn 
        }
    })
);