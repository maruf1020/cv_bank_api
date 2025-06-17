// src/app.module.ts

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './modules/users/module/users.module';
import { typeOrmConfig } from './config/database.config';
import { ApplicantModule } from './modules/applicant/applicant.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), UsersModule, ApplicantModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
