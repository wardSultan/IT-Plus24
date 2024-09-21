import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { json } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(json({ limit: '1mb' }));
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  const PORT = process.env.PORT;
  await app.listen(PORT ?? 3001);
}
bootstrap();
