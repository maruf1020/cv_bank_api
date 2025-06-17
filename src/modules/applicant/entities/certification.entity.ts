// src/modules/applicant/entities/certification.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { Applicant } from './applicant.entity';

@Entity('certifications')
export class Certification {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  id: string;

  @Column()
  @ApiProperty()
  @IsString()
  title: string;

  @Column()
  @ApiProperty()
  @IsString()
  issuingOrganization: string;

  @Column()
  @ApiProperty()
  @IsString()
  issueDate: string;

  @Column({ nullable: true })
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  credentialUrl?: string;

  @ManyToOne(() => Applicant, user => user.certifications)
  applicant: Applicant;
}
