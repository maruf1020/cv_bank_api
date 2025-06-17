// src/modules/applicant/dto/academic-record.dto.ts

import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsISO8601 } from 'class-validator';

export class AcademicRecordDto {
  @ApiProperty({ example: 'Bachelor', description: 'Education level' })
  @IsString()
  level: string;

  @ApiProperty({
    example: 'University of Technology',
    description: 'Educational institution',
  })
  @IsString()
  institute: string;

  @ApiProperty({
    example: 'Computer Science',
    required: false,
    description: 'Department or faculty',
  })
  @IsOptional()
  @IsString()
  department?: string;

  @ApiProperty({
    example: 'National Education Board',
    required: false,
    description: 'Governing body',
  })
  @IsOptional()
  @IsString()
  boardOrUniversity?: string;

  @ApiProperty({
    example: '2023-01-01T00:00:00.000Z',
    description: 'Graduation date in ISO format',
  })
  @IsISO8601()
  passingYear: string;

  @ApiProperty({ example: '3.8/4.0', description: 'Academic result' })
  @IsString()
  result: string;
}
