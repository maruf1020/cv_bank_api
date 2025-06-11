// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // strip away any properties that don't have any decorators
      forbidNonWhitelisted: true, // throw errors if non-whitelisted values are provided
      transform: true, // automatically transform payloads to be objects typed according to their DTO classes
    }),
  );

  await app.listen(3000);
}

bootstrap().catch((error) => {
  console.error('Error during application bootstrap:', error);
  process.exit(1); // Exit the process with a failure code
});
