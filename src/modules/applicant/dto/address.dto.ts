// src/modules/applicant/dto/address.dto.ts

import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class AddressDto {
  @ApiProperty({ example: '123 Main Street', description: 'Street address' })
  @IsString()
  addressLine: string;

  @ApiProperty({ example: 'San Francisco', description: 'City name' })
  @IsString()
  city: string;

  @ApiProperty({
    example: 'San Francisco County',
    required: false,
    description: 'District name',
  })
  @IsOptional()
  @IsString()
  district?: string;

  @ApiProperty({
    example: 'Downtown',
    required: false,
    description: 'Thana or sub-district',
  })
  @IsOptional()
  @IsString()
  thana?: string;

  @ApiProperty({
    example: 'California',
    required: false,
    description: 'State or province',
  })
  @IsOptional()
  @IsString()
  stateOrProvince?: string;

  @ApiProperty({
    example: '94105',
    required: false,
    description: 'Postal code',
  })
  @IsOptional()
  @IsString()
  postalCode?: string;

  @ApiProperty({ example: 'United States', description: 'Country name' })
  @IsString()
  country: string;
}
