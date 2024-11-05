import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
  //NODE_ENV: string;
  PORT: number;
  DATABASE_URL: string;
  ENCRYPTION_SECRET_KEY: string;
  JWT_SECRET_KEY: string;
  JWT_EXPIRES_IN: string;
  REFRESH_JWT_SECRET_KEY: string;
  REFRESH_JWT_EXPIRES_IN: string;
  GOOGLE_CLIENT_ID: string;
  GOOGLE_CLIENT_SECRET: string;
  GOOGLE_REDIRECT_URI: string;
  FRONTEND_URL: string;
}

const envsSchema = joi
  .object({
    // NODE_ENV: joi
    //   .string()
    //   .valid('development', 'production', 'test')
    //   .required(),
    PORT: joi.number().default(3000),
    DATABASE_URL: joi.string().required(),
    ENCRYPTION_SECRET_KEY: joi.string().required(),
    JWT_SECRET_KEY: joi.string().required(),
    JWT_EXPIRES_IN: joi.string().required(),
    REFRESH_JWT_SECRET_KEY: joi.string().required(),
    REFRESH_JWT_EXPIRES_IN: joi.string().required(),
    GOOGLE_CLIENT_ID: joi.string().required(),
    GOOGLE_CLIENT_SECRET: joi.string().required(),
    GOOGLE_REDIRECT_URI: joi.string().required(),
    FRONTEND_URL: joi.string().required(),
  })
  .unknown(true); //Permite que se puedan agregar mas variables de entorno sin que falle la validacion
//.required();

const { error, value } = envsSchema.validate(process.env);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export const envVars: EnvVars = value;

export const envs = {
  port: envVars.PORT,
  databaseUrl: envVars.DATABASE_URL,
  encryptionSecretKey: envVars.ENCRYPTION_SECRET_KEY,
  jwtSecretKey: envVars.JWT_SECRET_KEY,
  jwtExpiresIn: envVars.JWT_EXPIRES_IN,
  refreshJwtSecretKey: envVars.REFRESH_JWT_SECRET_KEY,
  refreshJwtExpiresIn: envVars.REFRESH_JWT_EXPIRES_IN,
  googleClientId: envVars.GOOGLE_CLIENT_ID,
  googleClientSecret: envVars.GOOGLE_CLIENT_SECRET,
  googleCallbackUrl: envVars.GOOGLE_REDIRECT_URI,
  frontendUrl: envVars.FRONTEND_URL,
};
