import { ConflictException, Injectable } from '@nestjs/common';
import { CreateProgrammingLanguageDto } from './dto/create-programming-language.dto';
import { UpdateProgrammingLanguageDto } from './dto/update-programming-language.dto';
import { ProgrammingLanguageRepository } from './repositories/programming-languages.repository';
import { ProgrammingLanguage } from './entities/programming-language.entity';

@Injectable()
export class ProgrammingLanguagesService {
  constructor(
    private readonly ProgrammingLanguageRepository: ProgrammingLanguageRepository,
  ) {}

  async create(
    createProgrammingLanguageDto: CreateProgrammingLanguageDto,
  ): Promise<ProgrammingLanguage> {
    const existingProgrammingLanguage =
      await this.ProgrammingLanguageRepository.findByName(
        createProgrammingLanguageDto.name,
      );
    if (existingProgrammingLanguage) {
      throw new ConflictException('Programming language already exists');
    }
    const programmingLanguage = this.ProgrammingLanguageRepository.create(
      createProgrammingLanguageDto,
    );
    return this.ProgrammingLanguageRepository.save(programmingLanguage);
  }

  findAll(): Promise<ProgrammingLanguage[]> {
    return this.ProgrammingLanguageRepository.find();
  }

  async findOne(id: string): Promise<ProgrammingLanguage> {
    const programmingLanguage =
      await this.ProgrammingLanguageRepository.findById(id);
    if (!programmingLanguage) {
      throw new ConflictException(
        `Programming language with ID ${id} not found`,
      );
    }
    return programmingLanguage;
  }

  async update(
    id: string,
    updateProgrammingLanguageDto: UpdateProgrammingLanguageDto,
  ): Promise<ProgrammingLanguage> {
    const programmingLanguage = await this.findOne(id);
    const updatedProgrammingLanguage = this.ProgrammingLanguageRepository.merge(
      programmingLanguage,
      updateProgrammingLanguageDto,
    );
    return this.ProgrammingLanguageRepository.save(updatedProgrammingLanguage);
  }

  async remove(id: string): Promise<ProgrammingLanguage> {
    const programmingLanguage = await this.findOne(id);
    await this.ProgrammingLanguageRepository.delete(id);
    return programmingLanguage;
  }
}
