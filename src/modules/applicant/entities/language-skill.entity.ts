// src/modules/applicant/entities/language-skill.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
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
  @IsString()
  language: string;

  @Column()
  @IsIn(ProficiencyLevels)
  proficiency: Proficiency;

  @ManyToOne(() => Applicant, (user) => user.languagesSpoken)
  applicant: Applicant;
}
