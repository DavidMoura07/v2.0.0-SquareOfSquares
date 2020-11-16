import { ApiProperty } from '@nestjs/swagger'
import { IsInt } from 'class-validator';

export class PointDto {
    @ApiProperty()
    @IsInt()
    x: number

    @ApiProperty()
    @IsInt()
    y: number

    constructor(x: number, y: number){
        this.x = x
        this.y = y
    }

}
