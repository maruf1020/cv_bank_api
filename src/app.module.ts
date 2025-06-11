// src/app.module.ts

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './modules/users/module/users.module';
import { typeOrmConfig } from './config/database.config';
import { UsersController } from './modules/users/controllers/users.controller';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), UsersModule],
  controllers: [AppController, UsersController],
  providers: [AppService],
})
export class AppModule {}
