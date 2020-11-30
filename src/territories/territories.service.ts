import { Inject, Injectable } from '@nestjs/common'
import { constants } from 'src/utils/constants'
import { Square } from 'src/squares/entities/square.entity'
import { Repository } from 'typeorm'
import { CreateTerritoryDto } from './dto/create-territory.dto'
import { UpdateTerritoryDto } from './dto/update-territory.dto'
import { Territory } from './entities/territory.entity'

@Injectable()
export class TerritoriesService {

  constructor(
    @Inject(constants.TERRITORY_REPOSITORY)
    private territoryRepository: Repository<Territory>,
  ) {}


  async create(createTerritoryDto: CreateTerritoryDto): Promise<Territory> {
    const isOverlapping = await this._checkOverlay(createTerritoryDto)
    if(isOverlapping){
      throw new Error("Overlapping detected!")
    }
    const territory = new Territory()
    territory.createTerritoryDto(createTerritoryDto)
    return this.territoryRepository.save(territory)
  }

  async findAll(): Promise<Territory[]> {
    return this.territoryRepository.find()
  }

  async findOne(id: number): Promise<Territory> {
    return this.territoryRepository.findOne(id)
  }

  async update(id: number, updateTerritoryDto: UpdateTerritoryDto) {
    const territory = await this.findOne(id)
    territory.updateTerritoryDto(updateTerritoryDto)
    return this.territoryRepository.save(territory)
  }

  remove(id: number) {
    return this.territoryRepository.delete({id})
  }

  getTerritoryOverlay(){
    return `list of territories that overlaps another`
  }

  getIncompleteData(){
    return `list of territories with incomplete data`
  }

  getNotFound(){
    return `list of territories not founded`
  }


// // saber se a base inferior (xi,yi | xf,yi) ou a superior (xi,yf | xf,yf) invade algum território, se a base colide então a coluna colide
// WHERE ( YI <= yi < YF ) OR (YI < yf <= YF ) // a altura tá dentro 
// AND ( 
//     (
//         (xi <= XI < xf) // startX do território está dentro da base inferior 
//         OR 
//         (xi < XF <= xf) // OU endX do território está dentro da base inferior 
//     ) 
//     OR (
//         (XI <= xi <= XF) AND (XI <= xf <= XF) // OU se a base inferior está totalmente dentro do território
//     ) 
// )

  private async _checkOverlay(territoryDto: CreateTerritoryDto): Promise<boolean>{
    const territoryOverlapped = await this.territoryRepository
    .createQueryBuilder('territory')
    .where(`
      (
        (territory.startY <= :startY AND :startY < territory.endY)
        OR
        (territory.startY < :endY AND :endY <= territory.endY)
      )
      AND 
      (
          (:startX <= territory.startX AND territory.startX < :endX) 
          OR
          (:startX < territory.endX AND territory.endX <= :endX) 
        ) 
        OR (
          (territory.startX <= :startX AND :startX <= territory.endX)
          AND
          (territory.startX <= :endX AND :endX <= territory.endX )
      )`, 
      {
        startX: territoryDto.start.x, 
        startY: territoryDto.start.y,
        endX: territoryDto.end.x,
        endY: territoryDto.end.y
      } 
    ).getMany();
    if(territoryOverlapped.length > 0){
      return true
    }else{
      return false;
    }
  }

  private _print(word: any): void {
    console.log(word)
  }

  async getPaintedArea(id: number){
    return this.territoryRepository.createQueryBuilder('territory')
    .select("COUNT(*)", "painted_area")
    .innerJoin(Square, 's', 's.territory = territory.id')
    .where('territory.id = :id', {id})
    .getRawOne()
    .then(area => +area.painted_area)
  }

  async getPaintedSquares(id: number){
    return this.territoryRepository.createQueryBuilder('territory')
    .select("s.startX AS x, s.startY AS y")
    .innerJoin(Square, 's', 's.territory = territory.id')
    .where('territory.id = :id', {id})
    .getRawMany()
  }
}
