import { Controller, Get, Post, Body, Put, Param, Delete, UnprocessableEntityException, NotFoundException } from '@nestjs/common';
import { TerritoriesService } from './territories.service';
import { CreateTerritoryDto } from './dto/create-territory.dto';
import { UpdateTerritoryDto } from './dto/update-territory.dto';
import { ResponseDto } from 'src/utils/dto/response.dto';
import { TerritoryResponseDto } from './dto/territory-response.dto';

@Controller('territories')
export class TerritoriesController {
  constructor(private readonly territoriesService: TerritoriesService) {}

  @Post()
  async create(@Body() createTerritoryDto: CreateTerritoryDto) {
    try{
      const territory = await this.territoriesService.create(createTerritoryDto)
      const terrotoryRespose = new TerritoryResponseDto(territory)
      return new ResponseDto(terrotoryRespose, false)
    } catch (e) {
      const message = new ResponseDto({message: e.message, stack: e.stack}, true)
      throw new UnprocessableEntityException(message)
    }
  }

  @Get()
  async findAll() {
    try{
      const territories = await this.territoriesService.findAll()
      const resTerritories = territories.map(territory => new TerritoryResponseDto(territory))
      return new ResponseDto(resTerritories, false)

    } catch (e){
      const message = new ResponseDto({message: e.message, stack: e.stack}, true)
      throw new NotFoundException(message)
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.territoriesService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateTerritoryDto: UpdateTerritoryDto) {
    return this.territoriesService.update(+id, updateTerritoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.territoriesService.remove(+id);
  }
}
