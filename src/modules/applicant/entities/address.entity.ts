// src/modules/applicant/entities/address.entity.ts
import { Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class Address {
  @Column()
  @ApiProperty()
  @IsString()
  addressLine: string;

  @Column()
  @ApiProperty()
  @IsString()
  city: string;

  @Column({ nullable: true })
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  district?: string;

  @Column({ nullable: true })
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  thana?: string;

  @Column({ nullable: true })
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  stateOrProvince?: string;

  @Column({ nullable: true })
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  postalCode?: string;

  @Column()
  @ApiProperty()
  @IsString()
  country: string;
}