// src/modules/users/users.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { UsersService } from '../services/users.service';
import { UsersRepository } from '../repositories/users.repository';
import { UsersController } from '../controllers/users.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersService, UsersRepository], // Add UsersRepository here
  controllers: [UsersController],
  // exports: [UsersService], // Optional: if you want to use this service in other modules
})
export class UsersModule {}
