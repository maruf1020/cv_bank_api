import { Module } from '@nestjs/common';
import { ProgrammingLanguagesService } from './programming-languages.service';
import { ProgrammingLanguagesController } from './programming-languages.controller';

@Module({
  controllers: [ProgrammingLanguagesController],
  providers: [ProgrammingLanguagesService],
})
export class ProgrammingLanguagesModule {}
