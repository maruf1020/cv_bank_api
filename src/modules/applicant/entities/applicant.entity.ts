// File: src/modules/applicant/entities/applicant.entity.ts

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';
import { EmergencyContact } from './emergency-contact.entity';
import { Address } from './address.entity';
import { AcademicRecord } from './academic-record.entity';
import { WorkExperience } from './work-experience.entity';
import { Certification } from './certification.entity';
import { LanguageSkill } from './language-skill.entity';


export enum Gender {
  MALE = 'Male',
  FEMALE = 'Female',
  NON_BINARY = 'Non-binary',
  TRANSGENDER = 'Transgender',
  OTHER = 'Other',
  PREFER_NOT_TO_SAY = 'Prefer not to say',
}

export enum MaritalStatus {
  SINGLE = 'Single',
  MARRIED = 'Married',
  DIVORCED = 'Divorced',
  WIDOWED = 'Widowed',
  SEPARATED = 'Separated',
  PREFER_NOT_TO_SAY = 'Prefer not to say',
}

export enum Religion {
  ISLAM = 'Islam',
  HINDUISM = 'Hinduism',
  CHRISTIANITY = 'Christianity',
  BUDDHISM = 'Buddhism',
  JUDAISM = 'Judaism',
  SIKHISM = 'Sikhism',
  ATHEIST = 'Atheist',
  AGNOSTIC = 'Agnostic',
  OTHER = 'Other',
  PREFER_NOT_TO_SAY = 'Prefer not to say',
}

export enum BloodGroup {
  A_POS = 'A+',
  A_NEG = 'A-',
  B_POS = 'B+',
  B_NEG = 'B-',
  AB_POS = 'AB+',
  AB_NEG = 'AB-',
  O_POS = 'O+',
  O_NEG = 'O-',
  UNKNOWN = 'Unknown',
}

@Entity('user_profiles')
export class Applicant {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  id: string;

  @Column()
  @ApiProperty()
  @IsString()
  firstName: string;

  @Column({ nullable: true })
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  middleName?: string;

  @Column()
  @ApiProperty()
  @IsString()
  lastName: string;

  @Column({ nullable: true })
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  fullNameInNative?: string;

  @Column({ type: 'enum', enum: Gender })
  @ApiProperty({ enum: Gender })
  @IsEnum(Gender)
  gender: Gender;

  @Column({ type: 'enum', enum: Religion })
  @ApiProperty({ enum: Religion })
  @IsEnum(Religion)
  religion: Religion;

  @Column({ type: 'enum', enum: BloodGroup })
  @ApiProperty({ enum: BloodGroup })
  @IsEnum(BloodGroup)
  bloodGroup: BloodGroup;

  @Column()
  @ApiProperty()
  @IsDateString()
  dateOfBirth: string;

  @Column()
  @ApiProperty()
  @IsString()
  placeOfBirth: string;

  @Column({ type: 'enum', enum: MaritalStatus })
  @ApiProperty({ enum: MaritalStatus })
  @IsEnum(MaritalStatus)
  maritalStatus: MaritalStatus;

  @Column()
  @ApiProperty()
  @IsString()
  nationality: string;

  @Column()
  @ApiProperty()
  @IsString()
  nationalIdNumber: string;

  @Column({ nullable: true })
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  passportNumber?: string;

  @Column()
  @ApiProperty()
  @IsString()
  fatherName: string;

  @Column()
  @ApiProperty()
  @IsString()
  motherName: string;

  @Column({ unique: true })
  @ApiProperty()
  @IsEmail()
  email: string;

  @Column()
  @ApiProperty()
  @IsString()
  mobileNumber: string;

  @Column(type => EmergencyContact)
  emergencyContact: EmergencyContact;

  @Column(type => Address)
  permanentAddress: Address;

  @Column(type => Address)
  presentAddress: Address;

  @Column()
  @ApiProperty()
  @IsString()
  photographUrl: string;

  @Column({ type: 'text', nullable: true })
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  introduction?: string;

  @OneToMany(() => AcademicRecord, record => record.applicant, { cascade: true })
  academic: AcademicRecord[];

  @OneToMany(() => WorkExperience, work => work.applicant, { cascade: true })
  workExperiences: WorkExperience[];

  @OneToMany(() => Certification, cert => cert.applicant, { cascade: true })
  certifications?: Certification[];

  @OneToMany(() => LanguageSkill, lang => lang.applicant, { cascade: true })
  languagesSpoken?: LanguageSkill[];

  @Column("simple-array", { nullable: true })
  hobbies?: string[];

  @Column("simple-array", { nullable: true })
  awards?: string[];

  @Column()
  @ApiProperty()
  @IsString()
  referencesELXID: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

// Related entities like AcademicRecord, WorkExperience, etc. should be created
// as separate files in the same directory: `src/modules/applicant/entities/`
