// src/modules/applicant/entities/language-skill.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsIn } from 'class-validator';
import { Applicant } from './applicant.entity';

export const ProficiencyLevels = [
  'Basic',
  'Conversational',
  'Fluent',
  'Native',
] as const;
export type Proficiency = (typeof ProficiencyLevels)[number];

@Entity('language_skills')
export class LanguageSkill {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @ApiProperty({ example: 'Spanish', description: 'Language name' })
  @IsString()
  language: string;

  @Column()
  @ApiProperty({
    enum: ProficiencyLevels,
    example: 'Fluent',
    description: 'Proficiency level',
  })
  @IsIn(ProficiencyLevels)
  proficiency: Proficiency;

  @ManyToOne(() => Applicant, (user) => user.languagesSpoken)
  @ApiProperty({ type: () => Applicant })
  applicant: Applicant;
}
