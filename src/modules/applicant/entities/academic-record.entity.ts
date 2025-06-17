// src/modules/applicant/entities/academic-record.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { Applicant } from './applicant.entity';

@Entity('academic_records')
export class AcademicRecord {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  id: string;

  @Column()
  @ApiProperty()
  @IsString()
  level: string;

  @Column()
  @ApiProperty()
  @IsString()
  institute: string;

  @Column({ nullable: true })
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  department?: string;

  @Column({ nullable: true })
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  boardOrUniversity?: string;

  @Column()
  @ApiProperty()
  @IsString()
  passingYear: string;

  @Column()
  @ApiProperty()
  @IsString()
  result: string;

  @ManyToOne(() => Applicant, user => user.academic)
  applicant: Applicant;
}