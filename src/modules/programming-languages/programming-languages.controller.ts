import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProgrammingLanguagesService } from './programming-languages.service';
import { CreateProgrammingLanguageDto } from './dto/create-programming-language.dto';
import { UpdateProgrammingLanguageDto } from './dto/update-programming-language.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProgrammingLanguage } from './entities/programming-language.entity';

@ApiTags('Programming Languages')
@Controller('programming-languages')
export class ProgrammingLanguagesController {
  constructor(
    private readonly programmingLanguagesService: ProgrammingLanguagesService,
  ) {}

  @ApiOperation({ summary: 'Create a new programming language' })
  @Post()
  @ApiResponse({
    status: 201,
    description: 'Programming language created successfully',
    type: ProgrammingLanguage,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({
    status: 409,
    description: 'Programming language already exists',
  })
  create(@Body() createProgrammingLanguageDto: CreateProgrammingLanguageDto) {
    return this.programmingLanguagesService.create(
      createProgrammingLanguageDto,
    );
  }

  @Get()
  findAll() {
    return this.programmingLanguagesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.programmingLanguagesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProgrammingLanguageDto: UpdateProgrammingLanguageDto,
  ) {
    return this.programmingLanguagesService.update(
      +id,
      updateProgrammingLanguageDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.programmingLanguagesService.remove(+id);
  }
}
