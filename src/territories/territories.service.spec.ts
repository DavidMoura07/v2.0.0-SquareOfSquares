import { Test, TestingModule } from '@nestjs/testing';
import { TerritoriesService } from './territories.service';

describe('TerritoriesService', () => {
  let service: TerritoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TerritoriesService],
    }).compile();

    service = module.get<TerritoriesService>(TerritoriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
