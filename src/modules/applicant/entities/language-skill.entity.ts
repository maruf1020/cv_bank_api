// src/modules/applicant/entities/language-skill.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Applicant } from './applicant.entity';

@Entity('language_skills')
export class LanguageSkill {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  id: string;

  @Column()
  @ApiProperty()
  @IsString()
  language: string;

  @Column()
  @ApiProperty({ enum: ['Basic', 'Conversational', 'Fluent', 'Native'] })
  @IsString()
  proficiency: 'Basic' | 'Conversational' | 'Fluent' | 'Native';

  @ManyToOne(() => Applicant, user => user.languagesSpoken)
  applicant: Applicant;
}
