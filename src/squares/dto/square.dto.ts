import { ApiProperty } from "@nestjs/swagger"
import { IsBoolean, IsInt } from "class-validator"

export class SquareDto {
    @ApiProperty()
    @IsInt()
    x: number

    @ApiProperty()
    @IsInt()
    y: number

    @ApiProperty()
    @IsBoolean()
    painted: boolean

    constructor(x: number, y: number, painted: boolean){
        this.x = x
        this.y = y
        this.painted = painted
    }

}
