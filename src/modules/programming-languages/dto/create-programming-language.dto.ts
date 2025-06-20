import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsOptional } from 'class-validator';

export class CreateProgrammingLanguageDto {
  @ApiProperty({
    example: 'Python',
    description: 'Name of the programming language',
    required: true,
  })
  name: string;

  @ApiProperty({
    example: 'John Doe',
    description: 'Name of the person who created this entry',
    required: false,
  })
  @IsOptional()
  createdBy?: string;

  @ApiProperty({
    example:
      'A high-level programming language designed for readability and simplicity.',
    description: 'Description of the programming language',
    required: false,
  })
  @IsOptional()
  description?: string;

  @ApiProperty({
    example: 'https://example.com/logo.png',
    description: 'URL of the programming language logo',
    required: false,
  })
  @IsOptional()
  logoUrl?: string;

  @ApiProperty({
    example: ['Multi-paradigm', 'Object-oriented', 'Functional', 'Imperative'],
    description: 'Paradigms of the programming language',
    required: false,
    type: [String],
  })
  @IsArray()
  @IsOptional()
  paradigms?: string[];

  @ApiProperty({
    example: ['Web Development', 'Data Science', 'Machine Learning'],
    description: 'Use cases of the programming language',
    required: false,
    type: [String],
  })
  @IsArray()
  @IsOptional()
  useCases?: string[];

  @ApiProperty({
    example: true,
    description: 'Indicates if the programming language is currently active',
    required: true,
  })
  isActive: boolean;
}
