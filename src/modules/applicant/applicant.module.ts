import { Module } from '@nestjs/common';
import { ApplicantService } from './applicant.service';
import { ApplicantController } from './applicant.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Applicant } from './entities/applicant.entity';
import { ApplicantRepository } from './repositories/applicant.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Applicant])],
  providers: [ApplicantService, ApplicantRepository], 
  controllers: [ApplicantController], 
})
export class ApplicantModule {}
