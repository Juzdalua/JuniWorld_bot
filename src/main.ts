import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //use cors
  app.enableCors({
    origin: process.env.CORS_SITES?.split(","),
    optionsSuccessStatus: 200
  });

  //use validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,  //  DTO check
      forbidNonWhitelisted: true,
      transform: true,  //  change parameter type from string to our type without test app
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
