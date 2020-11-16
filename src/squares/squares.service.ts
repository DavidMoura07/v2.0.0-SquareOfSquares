import { Injectable } from '@nestjs/common';
import { CreateSquareDto } from './dto/create-square.dto';
import { UpdateSquareDto } from './dto/update-square.dto';

@Injectable()
export class SquaresService {
  create(createSquareDto: CreateSquareDto) {
    return 'This action adds a new square';
  }

  findAll() {
    return `This action returns all squares`;
  }

  findOne(id: number) {
    return `This action returns a #${id} square`;
  }

  update(id: number, updateSquareDto: UpdateSquareDto) {
    return `This action updates a #${id} square`;
  }

  remove(id: number) {
    return `This action removes a #${id} square`;
  }
}
