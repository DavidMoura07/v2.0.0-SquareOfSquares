import { Territory } from '../entities/territory.entity'
import { PointDto } from '../../utils/dto/point.dto'

export class TerritoryResponseDto {
    readonly id: number
    readonly name: string
    readonly start: PointDto
    readonly end: PointDto
    readonly area: number
    readonly painted_area: number
    readonly painted_squares?: PointDto[]

    constructor(territory: Territory, painted_area?: number, painted_squares?: PointDto[]){
        this.id = territory.id
        this.name = territory.name
        this.start = new PointDto(territory.startX, territory.startY)
        this.end = new PointDto(territory.endX, territory.endY)
        this.area = this._calculateArea(territory)
        this.painted_area = painted_area || 0
        if(painted_squares){
            this.painted_squares = painted_squares
        }
    }

    private _calculateArea(territory: Territory){
        const base = territory.endX - territory.startX
        const high = territory.endY - territory.startY
        return base * high 
    }
}
