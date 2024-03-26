import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';
dotenv.config();
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT;
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  //app.setGlobalPrefix('api');
  await app.listen(8080);
}
bootstrap();
