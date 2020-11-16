import { Test, TestingModule } from '@nestjs/testing';
import { SquaresController } from './squares.controller';
import { SquaresService } from './squares.service';

describe('SquaresController', () => {
  let controller: SquaresController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SquaresController],
      providers: [SquaresService],
    }).compile();

    controller = module.get<SquaresController>(SquaresController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
