import { ApiProperty } from '@nestjs/swagger'
import { PointDto } from '../../utils/dto/point.dto'
import { IsNotEmpty, ValidateNested, IsDefined } from 'class-validator';
import { Type } from 'class-transformer/decorators';


export class CreateTerritoryDto {
    @ApiProperty()
    @IsNotEmpty()
    name: string

    @ApiProperty()
    @IsDefined()
    @ValidateNested()
    @Type(() => PointDto)
    start: PointDto
    
    @ApiProperty()
    @IsDefined()
    @ValidateNested()
    @Type(() => PointDto)
    end: PointDto
}
