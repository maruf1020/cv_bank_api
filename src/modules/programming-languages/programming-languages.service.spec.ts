import { Test, TestingModule } from '@nestjs/testing';
import { ProgrammingLanguagesService } from './programming-languages.service';

describe('ProgrammingLanguagesService', () => {
  let service: ProgrammingLanguagesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProgrammingLanguagesService],
    }).compile();

    service = module.get<ProgrammingLanguagesService>(ProgrammingLanguagesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
