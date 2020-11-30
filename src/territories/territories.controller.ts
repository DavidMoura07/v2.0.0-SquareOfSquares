import { Controller, Get, Post, Body, Put, Param, Delete, UnprocessableEntityException, NotFoundException, Query } from '@nestjs/common';
import { TerritoriesService } from './territories.service';
import { CreateTerritoryDto } from './dto/create-territory.dto';
import { UpdateTerritoryDto } from './dto/update-territory.dto';
import { ResponseDto } from 'src/utils/dto/response.dto';
import { TerritoryResponseDto } from './dto/territory-response.dto';
import { ErrorsService } from 'src/errors/errors.service';

@Controller('territories')
export class TerritoriesController {
  constructor(
    private readonly territoriesService: TerritoriesService,
    private readonly errorsService: ErrorsService
    ) {}

  @Post()
  async create(@Body() createTerritoryDto: CreateTerritoryDto) {
    try{
      return await this.territoriesService.create(createTerritoryDto)
    } catch (e) {
      throw new UnprocessableEntityException({message: e.message, stack: e.stack})
    }
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateTerritoryDto: UpdateTerritoryDto) {
    return this.territoriesService.update(+id, updateTerritoryDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try{
      const response = await this.territoriesService.remove(+id);
      if(response.affected === 0){
        const message = `Territory ID ${id} not found`
        this.errorsService.registerError(message, ErrorsTypes.NOT_FOUND, Domains.TERRITORY)
        throw new NotFoundException(message)
      }
      return new ResponseDto(null, false)
    }catch (e){
      console.log(e)
      const message = new ResponseDto({message: e.message, stack: e.stack} , true)
      throw new NotFoundException(message)
    }
  }

  @Get()
  async findAll() {
    try{
      const territories = await this.territoriesService.findAll()
      const resTerritories = territories.map(async territory => {
        const paintedArea = await this.territoriesService.getPaintedArea(territory.id)
        return new TerritoryResponseDto(territory, paintedArea)
      })
      return await Promise.all(resTerritories)

    } catch (e){
      // this.errorsService.registerError(message, e.message, ErrorsTypes.NOT_FOUND, Domains.TERRITORY)
      throw new NotFoundException({message: e.message, stack: e.stack})
    }
  }

  @Get('territory-overlay')
  async getTerrotoryOverlay(){
    return this.territoriesService.getTerritoryOverlay()
  }

  @Get('incomplete-data')
  async getIncompleteData(){
    return this.territoriesService.getIncompleteData()
  }

  @Get('not-found')
  async getNotFound(){
    return this.territoriesService.getNotFound()
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Query('withpainted') withpainted: boolean) {
    try{
      const territory = await this.territoriesService.findOne(+id)
      if(!territory){
        throw new Error(`Territory ID ${id} not found`)
      }
      const paintedArea = await this.territoriesService.getPaintedArea(+id)
      let paintedSquares = null
      if(withpainted){
        paintedSquares = await this.territoriesService.getPaintedSquares(+id)
      }
      const resTerritories =  new TerritoryResponseDto(territory, paintedArea, paintedSquares)
      return new ResponseDto(resTerritories)
    } catch (e){
      const message = {message: e.message, stack: e.stack}
      this.errorsService.registerError(e.message, ErrorsTypes.NOT_FOUND, Domains.TERRITORY, message)
      throw new NotFoundException(message)
    }
  }
}
