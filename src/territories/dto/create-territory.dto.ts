import { ApiProperty } from '@nestjs/swagger'
import { PointDto } from '../../utils/dto/point.dto'
import { IsNotEmpty, ValidateNested } from 'class-validator';


export class CreateTerritoryDto {
    @ApiProperty()
    @IsNotEmpty()
    name: string

    @ApiProperty()
    @ValidateNested()
    start: PointDto
    
    @ApiProperty()
    @ValidateNested()
    end: PointDto

}
