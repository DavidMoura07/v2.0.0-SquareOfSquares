import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { SquaresService } from './squares.service';
import { CreateSquareDto } from './dto/create-square.dto';
import { UpdateSquareDto } from './dto/update-square.dto';

@Controller('squares')
export class SquaresController {
  constructor(private readonly squaresService: SquaresService) {}

  @Post()
  create(@Body() createSquareDto: CreateSquareDto) {
    return this.squaresService.create(createSquareDto);
  }

  @Get()
  findAll() {
    return this.squaresService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.squaresService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateSquareDto: UpdateSquareDto) {
    return this.squaresService.update(+id, updateSquareDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.squaresService.remove(+id);
  }
}
