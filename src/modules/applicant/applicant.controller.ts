import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { ApplicantService } from './applicant.service';
import { CreateApplicantDto } from './dto/create-applicant.dto';
import { UpdateApplicantDto } from './dto/update-applicant.dto';
import { Applicant } from './entities/applicant.entity';

@ApiTags('Applicants')
@ApiBearerAuth()
@Controller('applicants')
export class ApplicantController {
  constructor(private readonly applicantService: ApplicantService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new applicant' })
  @ApiResponse({
    status: 201,
    description: 'Applicant created',
    type: Applicant,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 409, description: 'Email already exists' })
  create(@Body() createDto: CreateApplicantDto): Promise<Applicant> {
    return this.applicantService.create(createDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all applicants' })
  @ApiResponse({
    status: 200,
    description: 'List of all applicants',
    type: Applicant,
    isArray: true,
  })
  async findAll(): Promise<Applicant[]> {
    return this.applicantService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get applicant by ID' })
  @ApiParam({ name: 'id', description: 'Applicant ID' })
  @ApiResponse({
    status: 200,
    description: 'Applicant details',
    type: Applicant,
  })
  @ApiResponse({ status: 404, description: 'Applicant not found' })
  findOne(@Param('id') id: string): Promise<Applicant> {
    return this.applicantService.findOne(id);
  }

  @Get('email/:email')
  @ApiOperation({ summary: 'Get applicant by email' })
  @ApiParam({ name: 'email', description: 'Applicant email' })
  @ApiResponse({
    status: 200,
    description: 'Applicant details',
    type: Applicant,
  })
  @ApiResponse({ status: 404, description: 'Applicant not found' })
  findByEmail(@Param('email') email: string): Promise<Applicant> {
    return this.applicantService.findByEmail(email);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update applicant' })
  @ApiParam({ name: 'id', description: 'Applicant ID' })
  @ApiResponse({
    status: 200,
    description: 'Updated applicant',
    type: Applicant,
  })
  @ApiResponse({ status: 404, description: 'Applicant not found' })
  @ApiResponse({ status: 409, description: 'Email already exists' })
  @ApiBody({ type: UpdateApplicantDto })
  update(
    @Param('id') id: string,
    @Body() updateDto: UpdateApplicantDto,
  ): Promise<Applicant> {
    return this.applicantService.update(id, updateDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete applicant' })
  @ApiParam({ name: 'id', description: 'Applicant ID' })
  @ApiResponse({ status: 204, description: 'Applicant deleted' })
  @ApiResponse({ status: 404, description: 'Applicant not found' })
  async remove(@Param('id') id: string): Promise<void> {
    await this.applicantService.remove(id);
  }
}
