// src/modules/applicant/entities/emergency-contact.entity.ts
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

@Entity('emergency_contacts')
export class EmergencyContact {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @IsString()
  name: string;

  @Column()
  @IsString()
  phoneNumber: string;

  @Column()
  @IsString()
  relationship: string;
}
