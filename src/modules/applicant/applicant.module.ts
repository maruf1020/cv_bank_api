import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicantController } from './applicant.controller';
import { ApplicantService } from './applicant.service';
import { ApplicantRepository } from './repositories/applicant.repository';
import { Applicant } from './entities/applicant.entity';
import { AcademicRecord } from './entities/academic-record.entity';
import { WorkExperience } from './entities/work-experience.entity';
import { Certification } from './entities/certification.entity';
import { LanguageSkill } from './entities/language-skill.entity';
import { EmergencyContact } from './entities/emergency-contact.entity';
import { Address } from './entities/address.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Applicant,
      AcademicRecord,
      WorkExperience,
      Certification,
      LanguageSkill,
      EmergencyContact,
      Address,
    ]),
  ],
  controllers: [ApplicantController],
  providers: [ApplicantService, ApplicantRepository],
  // exports: [ApplicantService, ApplicantRepository],
})
export class ApplicantModule {}
