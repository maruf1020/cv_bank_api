// src/modules/users/repositories/users.repository.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { UserCreateDto } from '../dto/user-create.dto';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User)
    private repository: Repository<User>,
  ) {}

  async find(): Promise<User[]> {
    return this.repository.find();
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.repository.findOne({ where: { email } });
  }

  async findById(id: number): Promise<User | null> {
    return this.repository.findOne({ where: { id } });
  }

  create(userCreateDto: UserCreateDto): User {
    return this.repository.create(userCreateDto);
  }

  async save(user: User): Promise<User> {
    return this.repository.save(user);
  }

  merge(user: User, partialEntity: Partial<User>): User {
    return this.repository.merge(user, partialEntity);
  }

  async delete(id: number): Promise<DeleteResult> {
    return this.repository.delete(id);
  }
}
