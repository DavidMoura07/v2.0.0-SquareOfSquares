import { Controller, Get, Param, Patch } from '@nestjs/common';
import { SquaresService } from './squares.service';

@Controller('squares')
export class SquaresController {
  constructor(private readonly squaresService: SquaresService) {}

  @Get(':x/:y')
  findOne(@Param('x') x: number, @Param('y') y: number) {
    return this.squaresService.findByCoordinates(x,y);
  }

  @Patch(':x/:y/paint')
  paintSquare(@Param('x') x: number, @Param('y') y: number){
    return this.squaresService.paint(x,y);
  }

}
