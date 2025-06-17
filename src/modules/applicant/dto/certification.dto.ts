// src/modules/applicant/dto/certification.dto.ts

import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsISO8601 } from 'class-validator';

export class CertificationDto {
  @ApiProperty({
    example: 'AWS Certified Solutions Architect',
    description: 'Certification title',
  })
  @IsString()
  title: string;

  @ApiProperty({
    example: 'Amazon Web Services',
    description: 'Issuing organization',
  })
  @IsString()
  issuingOrganization: string;

  @ApiProperty({
    example: '2022-06-01T00:00:00.000Z',
    description: 'Issue date in ISO format',
  })
  @IsISO8601()
  issueDate: string;

  @ApiProperty({
    example: 'https://example.com/credential',
    required: false,
    description: 'Credential URL',
  })
  @IsOptional()
  @IsString()
  credentialUrl?: string;
}
