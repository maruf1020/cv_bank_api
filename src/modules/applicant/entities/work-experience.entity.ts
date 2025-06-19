// src/modules/applicant/entities/work-experience.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsISO8601 } from 'class-validator';
import { Applicant } from './applicant.entity';

@Entity('work_experiences')
export class WorkExperience {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @IsString()
  companyName: string;

  @Column()
  @IsString()
  location: string;

  @Column()
  @IsString()
  designation: string;

  @Column()
  @IsISO8601()
  startDate: string;

  @Column({ nullable: true })
  @IsOptional()
  @IsISO8601()
  endDate?: string;

  @Column('simple-array')
  technologiesUsed: string[];

  @Column('simple-array')
  programmingLanguages: string[];

  @Column('simple-array', { nullable: true })
  @IsOptional()
  responsibilities?: string[];

  @ManyToOne(() => Applicant, (user) => user.workExperiences)
  applicant: Applicant;
}
