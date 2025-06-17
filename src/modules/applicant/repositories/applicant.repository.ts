// src/modules/applicant/repositories/user-profile.repository.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Applicant } from '../entities/applicant.entity';
import { CreateApplicantDto } from '../dto/create-applicant.dto';

@Injectable()
export class ApplicantRepository {
  constructor(
    @InjectRepository(Applicant)
    private readonly repository: Repository<Applicant>,
  ) {}

  async find(): Promise<Applicant[]> {
    return this.repository.find({
      relations: [
        'academic',
        'workExperiences',
        'certifications',
        'languagesSpoken',
        'permanentAddress',
        'presentAddress',
      ],
    });
  }

  async findByEmail(email: string): Promise<Applicant | null> {
    return this.repository.findOne({ where: { email } });
  }

  async findById(id: string): Promise<Applicant | null> {
    return this.repository.findOne({
      where: { id },
      relations: [
        'academic',
        'workExperiences',
        'certifications',
        'languagesSpoken',
        'emergencyContacts',
        'permanentAddress',
        'presentAddress',
      ],
    });
  }

  create(createApplicantDto: CreateApplicantDto): Applicant {
    return this.repository.create(createApplicantDto);
  }

  async save(applicant: Applicant): Promise<Applicant> {
    return this.repository.save(applicant);
  }

  merge(applicant: Applicant, partial: Partial<Applicant>): Applicant {
    return this.repository.merge(applicant, partial);
  }

  async delete(id: string): Promise<DeleteResult> {
    return this.repository.delete(id);
  }
}
