import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { MorganInterceptor, MorganModule } from 'nest-morgan';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    //use dotenv
    ConfigModule.forRoot({
      isGlobal:true,
      envFilePath: '.env'
      // envFilePath: process.env.NODE_ENV === 'dev' ? '.env.dev' : '.env',
      // ignoreEnvFile: process.env.NODE_ENV === 'production',
    }),
    MorganModule, 
  ],
  controllers: [AppController],
  providers: [
    // use morgan logger
    {
      provide: APP_INTERCEPTOR,
      useClass: MorganInterceptor("combined"),
    },   
    AppService
  ],
})
export class AppModule {}
