import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateProgrammingLanguageDto } from './create-programming-language.dto';
import { IsOptional, IsString, IsBoolean } from 'class-validator';

export class UpdateProgrammingLanguageDto extends PartialType(
  CreateProgrammingLanguageDto,
) {
  @ApiProperty({
    example: 'd1f2e3a4-b5c6-7d8e-9f0g-1h2i3j4k5l6m',
    description: 'Unique identifier for the programming language',
    required: true,
  })
  @IsString()
  id: string;

  @ApiProperty({
    example: 'Python',
    description: 'Name of the programming language',
    required: false,
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({
    example: true,
    description: 'Indicates if the programming language is currently active',
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
