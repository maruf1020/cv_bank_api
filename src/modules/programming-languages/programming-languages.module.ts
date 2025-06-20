import { Module } from '@nestjs/common';
import { ProgrammingLanguagesService } from './programming-languages.service';
import { ProgrammingLanguagesController } from './programming-languages.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProgrammingLanguage } from './entities/programming-language.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProgrammingLanguage])],
  controllers: [ProgrammingLanguagesController],
  providers: [ProgrammingLanguagesService],
})
export class ProgrammingLanguagesModule {}
