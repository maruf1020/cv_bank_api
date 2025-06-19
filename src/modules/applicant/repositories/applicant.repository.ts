// src/modules/applicant/repositories/applicant.repository.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions, FindManyOptions } from 'typeorm';
import { Applicant } from '../entities/applicant.entity';

@Injectable()
export class ApplicantRepository {
  constructor(
    @InjectRepository(Applicant)
    private readonly repository: Repository<Applicant>,
  ) {}

  // Find by ID with relations
  async findById(
    id: string,
    options?: FindOneOptions<Applicant>,
  ): Promise<Applicant | null> {
    const defaultOptions: FindOneOptions<Applicant> = {
      where: { id },
      relations: {
        academic: true,
        workExperiences: true,
        certifications: true,
        languagesSpoken: true,
        emergencyContact: true,
        permanentAddress: true,
        presentAddress: true,
      },
      ...options,
    };
    return this.repository.findOne(defaultOptions);
  }

  // Find all applicants
  async findAll(options?: FindManyOptions<Applicant>): Promise<Applicant[]> {
    const defaultOptions: FindManyOptions<Applicant> = {
      relations: {
        academic: true,
        workExperiences: true,
        certifications: true,
        languagesSpoken: true,
        emergencyContact: true,
        permanentAddress: true,
        presentAddress: true,
      },
      ...options,
    };

    return this.repository.find(defaultOptions);
  }

  // Find by email
  async findByEmail(email: string): Promise<Applicant | null> {
    return this.repository.findOne({
      where: { email },
      relations: {
        academic: true,
        workExperiences: true,
        certifications: true,
        languagesSpoken: true,
        emergencyContact: true,
        permanentAddress: true,
        presentAddress: true,
      },
    });
  }

  // Create new applicant
  async create(createApplicantDto: any): Promise<Applicant> {
    const applicant = this.repository.create(createApplicantDto);
    const savedApplicant = await this.repository.save(applicant);
    // Handle the case where save might return an array
    return Array.isArray(savedApplicant) ? savedApplicant[0] : savedApplicant;
  }

  // Update applicant
  async update(id: string, updateDto: any): Promise<Applicant> {
    await this.repository.update(id, updateDto);
    const updatedApplicant = await this.findById(id);
    if (!updatedApplicant) {
      throw new Error(`Applicant with ID ${id} not found after update`);
    }
    return updatedApplicant;
  }

  // Delete applicant
  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
