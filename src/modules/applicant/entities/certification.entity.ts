// src/modules/applicant/entities/certification.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { IsOptional, IsString, IsISO8601 } from 'class-validator';
import { Applicant } from './applicant.entity';

@Entity('certifications')
export class Certification {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @IsString()
  title: string;

  @Column()
  @IsString()
  issuingOrganization: string;

  @Column()
  @IsISO8601()
  issueDate: string;

  @Column({ nullable: true })
  @IsOptional()
  @IsString()
  credentialUrl?: string;

  @ManyToOne(() => Applicant, (user) => user.certifications)
  applicant: Applicant;
}
