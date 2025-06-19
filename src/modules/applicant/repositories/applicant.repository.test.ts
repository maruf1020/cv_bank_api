// src/modules/applicant/repositories/applicant.repository.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Brackets, FindOneOptions, FindManyOptions } from 'typeorm';
import { Applicant } from '../entities/applicant.entity';
import { PaginatedResult } from '../../../common/interfaces/paginated-result.interface';

@Injectable()
export class ApplicantRepository {
  constructor(
    @InjectRepository(Applicant)
    private readonly repository: Repository<Applicant>,
  ) {}

  async searchApplicants(
    searchTerm?: string,
    filters?: {
      firstName?: string;
      middleName?: string;
      lastName?: string;
      email?: string;
      mobileNumber?: string;
      fullNameInNative?: string;
      gender?: string;
      nationality?: string;
      workExperienceCompany?: string;
      certificationName?: string;
      language?: string;
      programmingLanguage?: string;
      award?: string;
      academicInstitute?: string;
      academicSubject?: string;
      academicResult?: string;
      addressCity?: string;
      addressCountry?: string;
    },
    sort?: { field: string; order: 'ASC' | 'DESC' },
    pagination?: { page: number; limit: number },
  ): Promise<PaginatedResult<Applicant>> {
    // Create base query with all relations
    let query = this.repository
      .createQueryBuilder('applicant')
      .leftJoinAndSelect('applicant.academic', 'academic')
      .leftJoinAndSelect('applicant.workExperiences', 'workExperience')
      .leftJoinAndSelect('applicant.certifications', 'certification')
      .leftJoinAndSelect('applicant.languagesSpoken', 'languageSkill')
      .leftJoinAndSelect('applicant.emergencyContact', 'emergencyContact')
      .leftJoinAndSelect('applicant.permanentAddress', 'permanentAddress')
      .leftJoinAndSelect('applicant.presentAddress', 'presentAddress');

    // Apply search term
    if (searchTerm) {
      query = query.andWhere(
        new Brackets((qb) => {
          qb.where('applicant.firstName ILIKE :searchTerm', {
            searchTerm: `%${searchTerm}%`,
          })
            .orWhere('applicant.middleName ILIKE :searchTerm', {
              searchTerm: `%${searchTerm}%`,
            })
            .orWhere('applicant.lastName ILIKE :searchTerm', {
              searchTerm: `%${searchTerm}%`,
            })
            .orWhere('applicant.email ILIKE :searchTerm', {
              searchTerm: `%${searchTerm}%`,
            })
            .orWhere('applicant.mobileNumber ILIKE :searchTerm', {
              searchTerm: `%${searchTerm}%`,
            });
        }),
      );
    }

    // Apply filters
    if (filters) {
      // Direct applicant filters
      if (filters.firstName)
        query = query.andWhere('applicant.firstName ILIKE :firstName', {
          firstName: `%${filters.firstName}%`,
        });
      if (filters.middleName)
        query = query.andWhere('applicant.middleName ILIKE :middleName', {
          middleName: `%${filters.middleName}%`,
        });
      if (filters.lastName)
        query = query.andWhere('applicant.lastName ILIKE :lastName', {
          lastName: `%${filters.lastName}%`,
        });
      if (filters.email)
        query = query.andWhere('applicant.email ILIKE :email', {
          email: `%${filters.email}%`,
        });
      if (filters.mobileNumber)
        query = query.andWhere('applicant.mobileNumber ILIKE :mobileNumber', {
          mobileNumber: `%${filters.mobileNumber}%`,
        });
      if (filters.fullNameInNative)
        query = query.andWhere(
          'applicant.fullNameInNative ILIKE :fullNameInNative',
          { fullNameInNative: `%${filters.fullNameInNative}%` },
        );
      if (filters.gender)
        query = query.andWhere('applicant.gender = :gender', {
          gender: filters.gender,
        });
      if (filters.nationality)
        query = query.andWhere('applicant.nationality ILIKE :nationality', {
          nationality: `%${filters.nationality}%`,
        });

      // Nested relation filters
      if (filters.workExperienceCompany) {
        query = query.andWhere(
          'workExperience.companyName ILIKE :workCompany',
          { workCompany: `%${filters.workExperienceCompany}%` },
        );
      }
      if (filters.certificationName) {
        query = query.andWhere('certification.title ILIKE :certName', {
          certName: `%${filters.certificationName}%`,
        });
      }
      if (filters.language) {
        query = query.andWhere('languageSkill.language ILIKE :language', {
          language: `%${filters.language}%`,
        });
      }
      if (filters.programmingLanguage) {
        query = query.andWhere(
          'workExperience.programmingLanguages::text ILIKE :progLang',
          { progLang: `%${filters.programmingLanguage}%` },
        );
      }
      if (filters.award) {
        query = query.andWhere('applicant.awards::text ILIKE :award', {
          award: `%${filters.award}%`,
        });
      }
      if (filters.academicInstitute) {
        query = query.andWhere('academic.institute ILIKE :institute', {
          institute: `%${filters.academicInstitute}%`,
        });
      }
      if (filters.academicSubject) {
        query = query.andWhere('academic.department ILIKE :subject', {
          subject: `%${filters.academicSubject}%`,
        });
      }
      if (filters.academicResult) {
        query = query.andWhere('academic.result ILIKE :result', {
          result: `%${filters.academicResult}%`,
        });
      }
      if (filters.addressCity) {
        query = query.andWhere(
          new Brackets((qb) => {
            qb.where('permanentAddress.city ILIKE :city', {
              city: `%${filters.addressCity}%`,
            }).orWhere('presentAddress.city ILIKE :city', {
              city: `%${filters.addressCity}%`,
            });
          }),
        );
      }

      if (filters.addressCountry) {
        query = query.andWhere(
          new Brackets((qb) => {
            qb.where('permanentAddress.country ILIKE :country', {
              country: `%${filters.addressCountry}%`,
            }).orWhere('presentAddress.country ILIKE :country', {
              country: `%${filters.addressCountry}%`,
            });
          }),
        );
      }
    }

    // Apply sorting
    if (sort) {
      const sortFieldMap: Record<string, string> = {
        firstName: 'applicant.firstName',
        lastName: 'applicant.lastName',
        email: 'applicant.email',
        fullNameInNative: 'applicant.fullNameInNative',
        gender: 'applicant.gender',
        nationality: 'applicant.nationality',
        createdAt: 'applicant.createdAt',
      };

      const sortField = sortFieldMap[sort.field] || 'applicant.createdAt';
      query = query.orderBy(sortField, sort.order);
    } else {
      query = query.orderBy('applicant.createdAt', 'DESC');
    }

    // Get total count before pagination
    const total = await query.getCount();

    // Apply pagination
    let page = 1;
    let limit = 10;
    if (pagination) {
      page = pagination.page || 1;
      limit = pagination.limit || 10;
      query = query.skip((page - 1) * limit).take(limit);
    }

    // Execute query
    const data = await query.getMany();

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

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

  // Find all applicants with pagination
  async findAll(
    options?: FindManyOptions<Applicant>,
  ): Promise<PaginatedResult<Applicant>> {
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

    const [data, total] = await this.repository.findAndCount(defaultOptions);

    const page = 1;
    const limit = total;
    const totalPages = 1;

    return {
      data,
      total,
      page,
      limit,
      totalPages,
    };
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
    const result = await this.repository.save(applicant);
    return Array.isArray(result) ? result[0] : result;
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
