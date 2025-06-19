// src/modules/applicant/entities/applicant.entity.ts
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  IsISO8601,
} from 'class-validator';
import { EmergencyContact } from './emergency-contact.entity';
import { Address } from './address.entity';
import { AcademicRecord } from './academic-record.entity';
import { WorkExperience } from './work-experience.entity';
import { Certification } from './certification.entity';
import { LanguageSkill } from './language-skill.entity';
import {
  Gender,
  MaritalStatus,
  Religion,
  BloodGroup,
} from '../enums/applicant.enum';

@Entity('applicant')
export class Applicant {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @IsString()
  firstName: string;

  @Column({ nullable: true })
  @IsOptional()
  @IsString()
  middleName?: string;

  @Column()
  @IsString()
  lastName: string;

  @Column({ nullable: true })
  @IsOptional()
  @IsString()
  fullNameInNative?: string;

  @Column({ type: 'enum', enum: Gender })
  @IsEnum(Gender)
  gender: Gender;

  @Column({ type: 'enum', enum: Religion })
  @IsEnum(Religion)
  religion: Religion;

  @Column({ type: 'enum', enum: BloodGroup })
  @IsEnum(BloodGroup)
  bloodGroup: BloodGroup;

  @Column()
  @IsISO8601()
  dateOfBirth: string;

  @Column()
  @IsString()
  placeOfBirth: string;

  @Column({ type: 'enum', enum: MaritalStatus })
  @IsEnum(MaritalStatus)
  maritalStatus: MaritalStatus;

  @Column()
  @IsString()
  nationality: string;

  @Column()
  @IsString()
  nationalIdNumber: string;

  @Column({ nullable: true })
  @IsOptional()
  @IsString()
  passportNumber?: string;

  @Column()
  @IsString()
  fatherName: string;

  @Column()
  @IsString()
  motherName: string;

  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Column()
  @IsString()
  mobileNumber: string;

  @OneToOne(() => EmergencyContact, { cascade: true, eager: true })
  @JoinColumn({ name: 'emergency_contact_id' })
  emergencyContact: EmergencyContact;

  @OneToOne(() => Address, { cascade: true, eager: true })
  @JoinColumn({ name: 'permanent_address_id' })
  permanentAddress: Address;

  @OneToOne(() => Address, { cascade: true, eager: true })
  @JoinColumn({ name: 'present_address_id' })
  presentAddress: Address;

  @Column()
  @IsString()
  photographUrl: string;

  @Column({ type: 'text', nullable: true })
  @IsOptional()
  @IsString()
  introduction?: string;

  @OneToMany(() => AcademicRecord, (record) => record.applicant, {
    cascade: true,
  })
  academic: AcademicRecord[];

  @OneToMany(() => WorkExperience, (work) => work.applicant, { cascade: true })
  workExperiences: WorkExperience[];

  @OneToMany(() => Certification, (cert) => cert.applicant, { cascade: true })
  certifications?: Certification[];

  @OneToMany(() => LanguageSkill, (lang) => lang.applicant, { cascade: true })
  languagesSpoken?: LanguageSkill[];

  @Column('simple-array', { nullable: true })
  hobbies?: string[];

  @Column('simple-array', { nullable: true })
  awards?: string[];

  @Column()
  @IsString()
  referencesELXID: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
