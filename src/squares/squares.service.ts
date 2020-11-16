import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Territory } from 'src/territories/entities/territory.entity';
import { constants } from 'src/utils/constants';
import { ResponseDto } from 'src/utils/dto/response.dto';
import { Repository } from 'typeorm';
import { SquareDto } from './dto/square.dto';
import { Square } from './entities/square.entity';

@Injectable()
export class SquaresService {

  constructor(
    @Inject(constants.SQUARE_REPOSITORY)
    private squareRepository: Repository<Square>,

    @Inject(constants.TERRITORY_REPOSITORY)
    private territoryRepository: Repository<Territory>,
  ) {}

  async findByCoordinates(x: number, y: number) {

    const square = await this.squareRepository.findOne({startX: x, startY: y})
    let territory
    let squareDto
    if(square){
      squareDto = new SquareDto(square.startX, square.startY, true)
    }else {
      territory = await this.findTerritoryContaningSquare(x,y)
    }
    if(territory){
      squareDto = new SquareDto(x, y, false)
    }

    if(squareDto){
      return new ResponseDto(squareDto, false)
    }else{
      // TODO: save logs of erros
      const notFound = new ResponseDto({message: `Square X:${x} Y:${y} does not belong to any territory.`})
      throw new NotFoundException(notFound)
    }
  }

  async findTerritoryContaningSquare(x: number, y: number){
    const response = await this.territoryRepository.createQueryBuilder('territory')
    .where(':x BETWEEN territory.startX AND (territory.endX - 1)', {x})
    .andWhere(':y BETWEEN territory.startY AND (territory.endY - 1)', {y})
    .getOne()
    return response
  }

  async paint(x: number, y: number) {
    const territory = await this.findTerritoryContaningSquare(x,y)
    if(!territory){
      // TODO: save logs of erros
      const notFound = new ResponseDto({message: `Can't paint a Square (${x}, ${y}) that does not belong to any territory.`})
      throw new NotFoundException(notFound)
    }

    const square = new Square()
    square.startX = x
    square.startY = y
    square.territory = territory
    const squareSaved = await this.squareRepository.save(square)
    const squareDto = new SquareDto(squareSaved.startX, squareSaved.startY, true)
    return new ResponseDto(squareDto, false)
  }
  
}
