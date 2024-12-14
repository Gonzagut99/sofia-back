import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { envs } from './config/envs';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
//import * as cors from 'cors';
import * as cookieParser from 'cookie-parser';
import * as morgan from 'morgan';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Main');
  //await app.listen(3000);

  //Validacion de DTOS
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      // transformOptions: {
      //   enableImplicitConversion: true,
      // },
    })
  );

    // Configuración Swagger en NestJS
    const config = new DocumentBuilder()
    .setTitle('Platzi API')
    .setDescription('Documentación Platzi API')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  // URL API
  SwaggerModule.setup('docs', app, document);

  const corsOptions = {
    origin: envs.frontendUrl, // Dominio del frontend
    credentials: true, // Habilita envío de cookies
  };
  
  app.enableCors(corsOptions)

  //cookie parser
  app.use(cookieParser());

  // Http logs
  app.use(morgan('combined'));

  await app.listen(envs.port);
  logger.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
