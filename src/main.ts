import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GlobalExceptionFilter } from './exception/global-exception.filter';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DiscordJS } from './classes/discord';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger(bootstrap.name);

  app.enableCors();
  app.useGlobalFilters(new GlobalExceptionFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true
    })
  );

  await DiscordJS.getInstance().init();

  await app.listen(process.env.PORT ?? 8000);
  logger.debug(`✅ Application is running on: http://localhost:${process.env.PORT ?? 8000} 🚀`);
}
bootstrap();
