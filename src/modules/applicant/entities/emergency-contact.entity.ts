// src/modules/applicant/entities/emergency-contact.entity.ts
import { Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class EmergencyContact {
  @Column()
  @ApiProperty()
  @IsString()
  name: string;

  @Column()
  @ApiProperty()
  @IsString()
  phoneNumber: string;

  @Column()
  @ApiProperty()
  @IsString()
  relationship: string;
}