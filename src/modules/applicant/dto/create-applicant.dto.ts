// src/modules/applicant/dto/create-applicant.dto.ts

import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  IsISO8601,
  IsArray,
  ValidateNested,
  ArrayMinSize,
} from 'class-validator';
import { Type } from 'class-transformer';
import {
  Gender,
  MaritalStatus,
  Religion,
  BloodGroup,
} from '../enums/applicant.enum';
import { AddressDto } from './address.dto';
import { EmergencyContactDto } from './emergency-contact.dto';
import { AcademicRecordDto } from './academic-record.dto';
import { WorkExperienceDto } from './work-experience.dto';
import { CertificationDto } from './certification.dto';
import { LanguageSkillDto } from './language-skill.dto';

export class CreateApplicantDto {
  @ApiProperty({ example: 'John', description: 'First name' })
  @IsString()
  firstName: string;

  @ApiProperty({
    example: 'Michael',
    required: false,
    description: 'Middle name',
  })
  @IsOptional()
  @IsString()
  middleName?: string;

  @ApiProperty({ example: 'Doe', description: 'Last name' })
  @IsString()
  lastName: string;

  @ApiProperty({
    example: 'জোন ডো',
    required: false,
    description: 'Full name in native language',
  })
  @IsOptional()
  @IsString()
  fullNameInNative?: string;

  @ApiProperty({
    enum: Gender,
    example: Gender.MALE,
    description: 'Gender identity',
  })
  @IsEnum(Gender)
  gender: Gender;

  @ApiProperty({
    enum: Religion,
    example: Religion.ISLAM,
    description: 'Religious affiliation',
  })
  @IsEnum(Religion)
  religion: Religion;

  @ApiProperty({
    enum: BloodGroup,
    example: BloodGroup.O_POS,
    description: 'Blood group',
  })
  @IsEnum(BloodGroup)
  bloodGroup: BloodGroup;

  @ApiProperty({
    example: '1990-01-01T00:00:00.000Z',
    description: 'Date of birth in ISO format',
  })
  @IsISO8601()
  dateOfBirth: string;

  @ApiProperty({ example: 'New York, USA', description: 'Place of birth' })
  @IsString()
  placeOfBirth: string;

  @ApiProperty({
    enum: MaritalStatus,
    example: MaritalStatus.SINGLE,
    description: 'Marital status',
  })
  @IsEnum(MaritalStatus)
  maritalStatus: MaritalStatus;

  @ApiProperty({ example: 'American', description: 'Nationality' })
  @IsString()
  nationality: string;

  @ApiProperty({ example: '123-456-789', description: 'National ID number' })
  @IsString()
  nationalIdNumber: string;

  @ApiProperty({
    example: 'AB123456',
    required: false,
    description: 'Passport number',
  })
  @IsOptional()
  @IsString()
  passportNumber?: string;

  @ApiProperty({ example: 'Richard Doe', description: "Father's full name" })
  @IsString()
  fatherName: string;

  @ApiProperty({ example: 'Mary Doe', description: "Mother's full name" })
  @IsString()
  motherName: string;

  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'Email address',
  })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '+1234567890', description: 'Mobile number' })
  @IsString()
  mobileNumber: string;

  @ApiProperty({
    type: () => EmergencyContactDto,
    description: 'Emergency contact information',
  })
  @ValidateNested()
  @Type(() => EmergencyContactDto)
  emergencyContact: EmergencyContactDto;

  @ApiProperty({ type: () => AddressDto, description: 'Permanent address' })
  @ValidateNested()
  @Type(() => AddressDto)
  permanentAddress: AddressDto;

  @ApiProperty({ type: () => AddressDto, description: 'Present address' })
  @ValidateNested()
  @Type(() => AddressDto)
  presentAddress: AddressDto;

  @ApiProperty({
    example: 'https://example.com/photo.jpg',
    description: 'Profile photo URL',
  })
  @IsString()
  photographUrl: string;

  @ApiProperty({
    example: 'Experienced software engineer...',
    required: false,
    description: 'Personal introduction',
  })
  @IsOptional()
  @IsString()
  introduction?: string;

  @ApiProperty({
    type: () => [AcademicRecordDto],
    description: 'Academic records',
    minItems: 1,
  })
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => AcademicRecordDto)
  academic: AcademicRecordDto[];

  @ApiProperty({
    type: () => [WorkExperienceDto],
    description: 'Work experiences',
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => WorkExperienceDto)
  workExperiences: WorkExperienceDto[];

  @ApiProperty({
    type: () => [CertificationDto],
    description: 'Certifications',
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CertificationDto)
  certifications?: CertificationDto[];

  @ApiProperty({
    type: () => [LanguageSkillDto],
    description: 'Language skills',
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => LanguageSkillDto)
  languagesSpoken?: LanguageSkillDto[];

  @ApiProperty({
    example: ['Reading', 'Hiking'],
    type: [String],
    required: false,
    description: 'List of hobbies',
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  hobbies?: string[];

  @ApiProperty({
    example: ['Employee of the Year'],
    type: [String],
    required: false,
    description: 'List of awards',
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  awards?: string[];

  @ApiProperty({
    example: 'REF-ELX-123',
    description: 'Reference ID from external system',
  })
  @IsString()
  referencesELXID: string;
}
