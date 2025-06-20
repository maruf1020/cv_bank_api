import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { ProgrammingLanguage } from '../entities/programming-language.entity';
import { CreateProgrammingLanguageDto } from '../dto/create-programming-language.dto';

@Injectable()
export class ProgrammingLanguageRepository {
  constructor(
    @InjectRepository(ProgrammingLanguage)
    private repository: Repository<ProgrammingLanguage>,
  ) {}

  async find(): Promise<ProgrammingLanguage[]> {
    return this.repository.find();
  }

  async findById(id: string): Promise<ProgrammingLanguage | null> {
    return this.repository.findOne({ where: { id: id } });
  }

  async findByName(name: string): Promise<ProgrammingLanguage | null> {
    return this.repository.findOne({ where: { name: name } });
  }

  create(
    createProgrammingLanguageDto: CreateProgrammingLanguageDto,
  ): ProgrammingLanguage {
    return this.repository.create(createProgrammingLanguageDto);
  }

  async save(
    programmingLanguage: ProgrammingLanguage,
  ): Promise<ProgrammingLanguage> {
    return this.repository.save(programmingLanguage);
  }

  merge(
    programmingLanguage: ProgrammingLanguage,
    partialEntity: Partial<ProgrammingLanguage>,
  ): ProgrammingLanguage {
    return this.repository.merge(programmingLanguage, partialEntity);
  }

  async delete(id: string): Promise<DeleteResult> {
    return this.repository.delete(id);
  }
}
