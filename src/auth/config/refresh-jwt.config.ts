import { registerAs } from "@nestjs/config";
import { JwtSignOptions } from "@nestjs/jwt";
import { envs } from "src/config";

export default registerAs(
    'refresh-jwt', //this is only a name for the configuration
    (): JwtSignOptions => ({
        secret: envs.refreshJwtSecretKey,
        expiresIn: envs.refreshJwtExpiresIn 
    })
);