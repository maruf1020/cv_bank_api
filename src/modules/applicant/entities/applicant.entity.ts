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
import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty({ example: 'Maruf', description: 'First name' })
  @IsString()
  firstName: string;

  @Column({ nullable: true })
  @ApiProperty({
    example: 'Islam',
    required: false,
    description: 'Middle name',
  })
  @IsOptional()
  @IsString()
  middleName?: string;

  @Column()
  @ApiProperty({ example: 'Billah', description: 'Last name' })
  @IsString()
  lastName: string;

  @Column({ nullable: true })
  @ApiProperty({
    example: 'মারুফ ইসলাম বিল্লাহ',
    required: false,
    description: 'Full name in native language',
  })
  @IsOptional()
  @IsString()
  fullNameInNative?: string;

  @Column({ type: 'enum', enum: Gender })
  @ApiProperty({
    enum: Gender,
    example: Gender.MALE,
    description: 'Gender identity',
  })
  @IsEnum(Gender)
  gender: Gender;

  @Column({ type: 'enum', enum: Religion })
  @ApiProperty({
    enum: Religion,
    example: Religion.ISLAM,
    description: 'Religious affiliation',
  })
  @IsEnum(Religion)
  religion: Religion;

  @Column({ type: 'enum', enum: BloodGroup })
  @ApiProperty({
    enum: BloodGroup,
    example: BloodGroup.B_POS,
    description: 'Blood group',
  })
  @IsEnum(BloodGroup)
  bloodGroup: BloodGroup;

  @Column()
  @ApiProperty({
    example: '1994-10-05T00:00:00.000Z',
    description: 'Date of birth in ISO format',
  })
  @IsISO8601()
  dateOfBirth: string;

  @Column()
  @ApiProperty({ example: 'Pabna, Bangladesh', description: 'Place of birth' })
  @IsString()
  placeOfBirth: string;

  @Column({ type: 'enum', enum: MaritalStatus })
  @ApiProperty({
    enum: MaritalStatus,
    example: MaritalStatus.SINGLE,
    description: 'Marital status',
  })
  @IsEnum(MaritalStatus)
  maritalStatus: MaritalStatus;

  @Column()
  @ApiProperty({ example: 'Bangladeshi', description: 'Nationality' })
  @IsString()
  nationality: string;

  @Column()
  @ApiProperty({ example: '123-456-789', description: 'National ID number' })
  @IsString()
  nationalIdNumber: string;

  @Column({ nullable: true })
  @ApiProperty({
    example: 'AB123456',
    required: false,
    description: 'Passport number',
  })
  @IsOptional()
  @IsString()
  passportNumber?: string;

  @Column()
  @ApiProperty({ example: 'Mahbub', description: "Father's full name" })
  @IsString()
  fatherName: string;

  @Column()
  @ApiProperty({ example: 'Mary', description: "Mother's full name" })
  @IsString()
  motherName: string;

  @Column({ unique: true })
  @ApiProperty({
    example: 'maruf@example.com',
    description: 'Email address',
  })
  @IsEmail()
  email: string;

  @Column()
  @ApiProperty({ example: '+8801000000000', description: 'Mobile number' })
  @IsString()
  mobileNumber: string;

  @OneToOne(() => EmergencyContact, { cascade: true, eager: true })
  @JoinColumn({ name: 'emergency_contact_id' })
  @ApiProperty({ type: () => EmergencyContact })
  emergencyContact: EmergencyContact;

  @OneToOne(() => Address, { cascade: true, eager: true })
  @JoinColumn({ name: 'permanent_address_id' })
  @ApiProperty({ type: () => Address })
  permanentAddress: Address;

  @OneToOne(() => Address, { cascade: true, eager: true })
  @JoinColumn({ name: 'present_address_id' })
  @ApiProperty({ type: () => Address })
  presentAddress: Address;

  @Column()
  @ApiProperty({
    example: 'https://example.com/photo.jpg',
    description: 'Profile photo URL',
  })
  @IsString()
  photographUrl: string;

  @Column({ type: 'text', nullable: true })
  @ApiProperty({
    example: 'Experienced software engineer...',
    required: false,
    description: 'Personal introduction',
  })
  @IsOptional()
  @IsString()
  introduction?: string;

  @OneToMany(() => AcademicRecord, (record) => record.applicant, {
    cascade: true,
  })
  @ApiProperty({
    type: () => [AcademicRecord],
    description: 'Academic records',
  })
  academic: AcademicRecord[];

  @OneToMany(() => WorkExperience, (work) => work.applicant, { cascade: true })
  @ApiProperty({
    type: () => [WorkExperience],
    description: 'Work experiences',
  })
  workExperiences: WorkExperience[];

  @OneToMany(() => Certification, (cert) => cert.applicant, { cascade: true })
  @ApiProperty({ type: () => [Certification], description: 'Certifications' })
  certifications?: Certification[];

  @OneToMany(() => LanguageSkill, (lang) => lang.applicant, { cascade: true })
  @ApiProperty({ type: () => [LanguageSkill], description: 'Language skills' })
  languagesSpoken?: LanguageSkill[];

  @Column('simple-array', { nullable: true })
  @ApiProperty({
    example: ['Reading', 'Hiking'],
    type: [String],
    required: false,
    description: 'List of hobbies',
  })
  hobbies?: string[];

  @Column('simple-array', { nullable: true })
  @ApiProperty({
    example: ['Employee of the Year'],
    type: [String],
    required: false,
    description: 'List of awards',
  })
  awards?: string[];

  @Column()
  @ApiProperty({
    example: 'ELX-123',
    description: 'Reference ID from external system',
  })
  @IsString()
  referencesELXID: string;

  @CreateDateColumn()
  @ApiProperty({
    example: '2023-01-01T00:00:00.000Z',
    description: 'Creation timestamp',
  })
  createdAt: Date;

  @UpdateDateColumn()
  @ApiProperty({
    example: '2023-01-02T00:00:00.000Z',
    description: 'Last update timestamp',
  })
  updatedAt: Date;
}
