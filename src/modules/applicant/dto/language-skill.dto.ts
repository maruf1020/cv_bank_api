// src/modules/applicant/dto/language-skill.dto.ts

import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEnum } from 'class-validator';
import { Proficiency } from '../enums/applicant.enum';

export class LanguageSkillDto {
  @ApiProperty({ example: 'Spanish', description: 'Language name' })
  @IsString()
  language: string;

  @ApiProperty({
    enum: Proficiency,
    example: Proficiency.FLUENT,
    description: 'Proficiency level',
  })
  @IsEnum(Proficiency)
  proficiency: Proficiency;
}
