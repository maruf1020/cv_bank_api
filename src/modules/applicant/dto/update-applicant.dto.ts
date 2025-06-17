// src/modules/applicant/dto/update-applicant.dto.ts

import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { CreateApplicantDto } from './create-applicant.dto';
import { Gender } from '../enums/applicant.enum';
import { AddressDto } from './address.dto';
import { EmergencyContactDto } from './emergency-contact.dto';
import { AcademicRecordDto } from './academic-record.dto';
import { WorkExperienceDto } from './work-experience.dto';
import { CertificationDto } from './certification.dto';
import { LanguageSkillDto } from './language-skill.dto';

export class UpdateApplicantDto extends PartialType(CreateApplicantDto) {
  // Override specific fields to make them optional in update
  @ApiProperty({ example: 'John', required: false, description: 'First name' })
  @IsOptional()
  @IsString()
  firstName?: string;

  @ApiProperty({ example: 'Doe', required: false, description: 'Last name' })
  @IsOptional()
  @IsString()
  lastName?: string;

  @ApiProperty({
    enum: Gender,
    example: Gender.MALE,
    required: false,
    description: 'Gender identity',
  })
  @IsOptional()
  @IsEnum(Gender)
  gender?: Gender;

  @ApiProperty({
    example: 'john.doe@example.com',
    required: false,
    description: 'Email address',
  })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({
    type: () => EmergencyContactDto,
    required: false,
    description: 'Emergency contact information',
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => EmergencyContactDto)
  emergencyContact?: EmergencyContactDto;

  @ApiProperty({
    type: () => AddressDto,
    required: false,
    description: 'Permanent address',
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => AddressDto)
  permanentAddress?: AddressDto;

  @ApiProperty({
    type: () => AddressDto,
    required: false,
    description: 'Present address',
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => AddressDto)
  presentAddress?: AddressDto;

  @ApiProperty({
    type: () => [AcademicRecordDto],
    required: false,
    description: 'Academic records',
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AcademicRecordDto)
  academic?: AcademicRecordDto[];

  @ApiProperty({
    type: () => [WorkExperienceDto],
    required: false,
    description: 'Work experiences',
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => WorkExperienceDto)
  workExperiences?: WorkExperienceDto[];

  @ApiProperty({
    type: () => [CertificationDto],
    required: false,
    description: 'Certifications',
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CertificationDto)
  certifications?: CertificationDto[];

  @ApiProperty({
    type: () => [LanguageSkillDto],
    required: false,
    description: 'Language skills',
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => LanguageSkillDto)
  languagesSpoken?: LanguageSkillDto[];
}
