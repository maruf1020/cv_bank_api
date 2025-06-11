// src/modules/users/services/users.service.ts
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from '../entities/user.entity';
import { UsersRepository } from '../repositories/users.repository';
import { DeleteResult } from 'typeorm';
import { UserCreateDto } from '../dto/user-create.dto';
import { UserUpdateDto } from '../dto/user-update.dto';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOne(id: number): Promise<User> {
    const user = await this.usersRepository.findById(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async create(userCreateDto: UserCreateDto): Promise<User> {
    // Check if email already exists
    const existingUser = await this.usersRepository.findByEmail(
      userCreateDto.email,
    );
    if (existingUser) {
      throw new ConflictException('Email already in use');
    }

    const user = this.usersRepository.create(userCreateDto);
    return this.usersRepository.save(user);
  }

  async update(id: number, userUpdateDto: UserUpdateDto): Promise<User> {
    const user = await this.findOne(id);
    const updated = this.usersRepository.merge(user, userUpdateDto);
    return this.usersRepository.save(updated);
  }

  async remove(id: number): Promise<void> {
    const result: DeleteResult = await this.usersRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  }
}
