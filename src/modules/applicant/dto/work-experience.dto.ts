// src/modules/applicant/dto/work-experience.dto.ts

import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsISO8601, IsArray } from 'class-validator';

export class WorkExperienceDto {
  @ApiProperty({ example: 'Google LLC', description: 'Company name' })
  @IsString()
  companyName: string;

  @ApiProperty({ example: 'Mountain View, CA', description: 'Office location' })
  @IsString()
  location: string;

  @ApiProperty({
    example: 'Senior Software Engineer',
    description: 'Job title',
  })
  @IsString()
  designation: string;

  @ApiProperty({
    example: '2020-01-01T00:00:00.000Z',
    description: 'Start date in ISO format',
  })
  @IsISO8601()
  startDate: string;

  @ApiProperty({
    example: '2023-01-01T00:00:00.000Z',
    required: false,
    description: 'End date in ISO format',
  })
  @IsOptional()
  @IsISO8601()
  endDate?: string;

  @ApiProperty({
    example: ['AWS', 'Kubernetes'],
    type: [String],
    description: 'Technologies used',
  })
  @IsArray()
  @IsString({ each: true })
  technologiesUsed: string[];

  @ApiProperty({
    example: ['JavaScript', 'TypeScript'],
    type: [String],
    description: 'Programming languages used',
  })
  @IsArray()
  @IsString({ each: true })
  programmingLanguages: string[];

  @ApiProperty({
    example: ['Led team of 5 developers', 'Implemented CI/CD pipeline'],
    type: [String],
    required: false,
    description: 'Job responsibilities',
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  responsibilities?: string[];
}
