import { Test, TestingModule } from '@nestjs/testing';
import { SquaresService } from './squares.service';

describe('SquaresService', () => {
  let service: SquaresService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SquaresService],
    }).compile();

    service = module.get<SquaresService>(SquaresService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
