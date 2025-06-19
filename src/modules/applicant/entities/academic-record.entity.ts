// src/modules/applicant/entities/academic-record.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { IsOptional, IsString, IsISO8601 } from 'class-validator';
import { Applicant } from './applicant.entity';

@Entity('academic_records')
export class AcademicRecord {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @IsString()
  level: string;

  @Column()
  @IsString()
  institute: string;

  @Column({ nullable: true })
  @IsOptional()
  @IsString()
  department?: string;

  @Column({ nullable: true })
  @IsOptional()
  @IsString()
  boardOrUniversity?: string;

  @Column()
  @IsISO8601()
  passingYear: string;

  @Column()
  @IsString()
  result: string;

  @ManyToOne(() => Applicant, (user) => user.academic)
  applicant: Applicant;
}
