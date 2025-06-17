// src/modules/applicant/dto/emergency-contact.dto.ts

import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class EmergencyContactDto {
  @ApiProperty({ example: 'Jane Smith', description: 'Full name' })
  @IsString()
  name: string;

  @ApiProperty({ example: '+1234567890', description: 'Phone number' })
  @IsString()
  phoneNumber: string;

  @ApiProperty({ example: 'Spouse', description: 'Relationship to applicant' })
  @IsString()
  relationship: string;
}
