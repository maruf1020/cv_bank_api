import { Injectable, NotFoundException } from '@nestjs/common';
import { ApplicantRepository } from './repositories/applicant.repository';
import { CreateApplicantDto } from './dto/create-applicant.dto';
import { UpdateApplicantDto } from './dto/update-applicant.dto';
import { Applicant } from './entities/applicant.entity';

@Injectable()
export class ApplicantService {
  constructor(private readonly applicantRepo: ApplicantRepository) {}

  async create(createDto: CreateApplicantDto): Promise<Applicant> {
    // Check if email already exists
    const existing = await this.applicantRepo.findByEmail(createDto.email);
    if (existing) {
      throw new NotFoundException('Email already exists');
    }
    return this.applicantRepo.create(createDto);
  }

  async findAll(): Promise<Applicant[]> {
    return this.applicantRepo.findAll();
  }

  async findOne(id: string): Promise<Applicant> {
    const applicant = await this.applicantRepo.findById(id);
    if (!applicant) {
      throw new NotFoundException(`Applicant with ID ${id} not found`);
    }
    return applicant;
  }

  async findByEmail(email: string): Promise<Applicant> {
    const applicant = await this.applicantRepo.findByEmail(email);
    if (!applicant) {
      throw new NotFoundException(`Applicant with email ${email} not found`);
    }
    return applicant;
  }

  async update(id: string, updateDto: UpdateApplicantDto): Promise<Applicant> {
    const applicant = await this.findOne(id);
    if (updateDto.email && updateDto.email !== applicant.email) {
      const emailExists = await this.applicantRepo.findByEmail(updateDto.email);
      if (emailExists) {
        throw new NotFoundException('Email already exists');
      }
    }
    return this.applicantRepo.update(id, updateDto);
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id); // Check if exists
    await this.applicantRepo.delete(id);
  }
}
