// src/modules/applicant/entities/address.entity.ts
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsOptional, IsString } from 'class-validator';

@Entity('addresses')
export class Address {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @IsString()
  addressLine: string;

  @Column()
  @IsString()
  city: string;

  @Column({ nullable: true })
  @IsOptional()
  @IsString()
  district?: string;

  @Column({ nullable: true })
  @IsOptional()
  @IsString()
  thana?: string;

  @Column({ nullable: true })
  @IsOptional()
  @IsString()
  stateOrProvince?: string;

  @Column({ nullable: true })
  @IsOptional()
  @IsString()
  postalCode?: string;

  @Column()
  @IsString()
  country: string;
}
