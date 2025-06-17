// src/modules/applicant/entities/work-experience.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { Applicant } from './applicant.entity';

@Entity('work_experiences')
export class WorkExperience {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  id: string;

  @Column()
  @ApiProperty()
  @IsString()
  companyName: string;

  @Column()
  @ApiProperty()
  @IsString()
  location: string;

  @Column()
  @ApiProperty()
  @IsString()
  designation: string;

  @Column()
  @ApiProperty()
  @IsString()
  startDate: string;

  @Column({ nullable: true })
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  endDate?: string;

  @Column("simple-array")
  @ApiProperty({ type: [String] })
  technologiesUsed: string[];

  @Column("simple-array")
  @ApiProperty({ type: [String] })
  programmingLanguages: string[];

  @Column("simple-array", { nullable: true })
  @ApiProperty({ type: [String], required: false })
  @IsOptional()
  responsibilities?: string[];

  @ManyToOne(() => Applicant, user => user.workExperiences)
  applicant: Applicant;
}
