import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as dotenv from 'dotenv';
import { AppModule } from './app.module';
import { DiscordJS } from './classes/discord';
import { GlobalExceptionFilter } from './exception/global-exception.filter';

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

  await Promise.all([
    DiscordJS.getInstance()
      .init()
      .then(() => {
        logger.debug(`✅ DiscordJS initialized.`);
      }),
    app.listen(process.env.PORT ?? 8000).then(() => {
      logger.debug(`✅ HTTP Application is running on: http://localhost:${process.env.PORT ?? 8000} 🚀`);
    })
  ])
    .then(() => {
      logger.debug('🚀 All initialization tasks completed.');
    })
    .catch((error) => {
      logger.error('❌ Error occurred during initialization:', error);
    });
}
bootstrap();
