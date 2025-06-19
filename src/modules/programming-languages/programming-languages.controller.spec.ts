import { Test, TestingModule } from '@nestjs/testing';
import { ProgrammingLanguagesController } from './programming-languages.controller';
import { ProgrammingLanguagesService } from './programming-languages.service';

describe('ProgrammingLanguagesController', () => {
  let controller: ProgrammingLanguagesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProgrammingLanguagesController],
      providers: [ProgrammingLanguagesService],
    }).compile();

    controller = module.get<ProgrammingLanguagesController>(ProgrammingLanguagesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
